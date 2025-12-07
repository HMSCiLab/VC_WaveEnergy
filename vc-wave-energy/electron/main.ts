import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

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

// Custom send handler
function safeSend(channel: string, ...args: any[]) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, ...args);
  }
}

// PORT CREATION
let port: any = null;
let waveData: number[] = [];
let parser: any = null;

async function tryArduinoConnection(){
  const ports = await SerialPort.list();
  const arduinoPort = ports.find((p: any) => 
    p.vendorId && (
      p.vendorId === "239a" ||
      p.productId === "800b"
    )
  );

  if (!arduinoPort) {
    if (port && port.isOpen) {
      port.close();
      port = null;
      safeSend("main.ts (97) >> Arduino not connected.")
    }
    return;
  }

  // Do nothing if connected
  if (port && port.isOpen) return;

  port = new SerialPort({
    path: arduinoPort.path,
    baudRate: 9600
  })

  port.on("open", () => {
    console.log("main.ts >> Arduino connected", arduinoPort.path);
    safeSend("arduino-connected");
  })
  
  port.on("close", () => {
    console.log("main.ts >> Arduino disconnected");
    port = null;
    safeSend("arduino-disconnected");
  })

  port.on('error', (err: Error) => {
    console.log("main.ts >> Arduino not connected.");
    safeSend("arduino-error", err.message);
  })

  parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

  // Receive serial info from arduino
  parser.on('data', (line: string) => {
    const val: number = parseFloat(line);
    if (!isNaN(val)){
        waveData.push(val);
        safeSend("wave-val", val);
      }
    else {
        // If val is not a number (ie \n), terminate transmission.
        console.log("main.ts >> Full wave: ", waveData)
        safeSend("complete-wave", waveData);
        waveData = [];
      }
    }
  );
}
setInterval(tryArduinoConnection, 1000);

function cleanup(){
  console.log("main.ts >> Shutting down app");
  if (port && port.isOpen) {
    try {
      port.close();
      console.log("main.ts >> Port closed");
    } catch (err) {
      console.log("main.ts >> Error: ", err);
    }
  }
  process.exit(0)
}
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
app.on("before-quit", cleanup);

// HANDLERS
ipcMain.handle("arduino-status", () => {
  return { connected: !!(port && port.isOpen) }
})

// Expose handle to IPC bridge
ipcMain.handle('send-wave', async(selected) => {
  const cmmd: string = JSON.stringify(selected);
  port.write(cmmd + '\n', (err: Error | null | undefined) => {
    err 
    ? console.log(`main.ts >> Error sending command to arduino: ${err}`) 
    : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
  });
  return 'OK';
});

