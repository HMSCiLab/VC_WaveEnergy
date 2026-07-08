import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'

import { APP_ROOT, ELECTRON_DIST } from './paths'
import { HEIGHT_SELECTION_OPTIONS, PERIOD_SELECTION_OPTIONS } from './config'

import { cleanup, initArduino, registerArduinoHandlers } from './arduinoInterface'
import { refreshData, registerPacWaveHandlers } from './pacwaveInterface'


export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST


let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    // kiosk: true,
    webPreferences: {
      preload: path.join(ELECTRON_DIST, 'preload.mjs'),
    },
    width: 1024,
    height: 1366,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('./dist/index.html')
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

app.whenReady().then(() => {
  createWindow();
  
  // ARUDINO
  initArduino(safeSend);
  registerArduinoHandlers();

  // PACWAVE PIPE
  refreshData();
  setInterval(refreshData, 1000 * 60 * 60);
  registerPacWaveHandlers();

  // CONFIG GETTERS
  ipcMain.handle('get-height-options', async () => {
    return HEIGHT_SELECTION_OPTIONS;
  })
  ipcMain.handle('get-period-options', async () => {
    return PERIOD_SELECTION_OPTIONS;
  })
})


// Custom send handler
export function safeSend(channel: string, ...args: any[]) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, ...args);
  }
}


// Arduino cleanup handlers
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
app.on("before-quit", cleanup);
