import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
// import { SerialPort } from 'serialport'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create
  //  a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// Create a port
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const port = new SerialPort({
  path: '/dev/cu.usbmodem101',
  baudRate: 9600,
})
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));
let waveData: number[] = [];

// Send serial info to arduino
function sendWave(selected: {size: number, period: number}){
  const cmmd: string = JSON.stringify(selected);
  port.write(cmmd + '\n', (err: Error | null | undefined) => {
    err 
    ? console.log(`main.ts >> Error sending command to arduino: ${err}`) 
    : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
  });
}

// Expose handle to IPC bridge
ipcMain.handle('send-wave', async(event, selected) => {
  sendWave(selected);
  return 'OK';
});

// Receive serial info from arduino
parser.on('data', (line: string) => {
  const val: number = parseFloat(line);
  if (!isNaN(val)){
      waveData.push(val);
      win?.webContents.send("wave-val", val);
    }
  else {
      // If val is not a number (ie \n), terminate transmission.
      console.log("main.ts >> Full wave: ", waveData)
      win?.webContents.send("complete-wave", waveData);
      waveData = [];
    }
  }
);