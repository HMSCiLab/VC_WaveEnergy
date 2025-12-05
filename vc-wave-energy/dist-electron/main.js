import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
const require2 = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
const { SerialPort } = require2("serialport");
const { ReadlineParser } = require2("@serialport/parser-readline");
const port = new SerialPort({
  path: "/dev/cu.usbmodem101",
  baudRate: 9600
});
port.on("error", (err) => {
  console.log("main.ts >> Arduino not connected.");
  win == null ? void 0 : win.webContents.send("e-error", err);
});
ipcMain.handle("arduino-status", () => {
  return { connected: port.isOpen };
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
let waveData = [];
function sendWave(selected) {
  const cmmd = JSON.stringify(selected);
  port.write(cmmd + "\n", (err) => {
    err ? console.log(`main.ts >> Error sending command to arduino: ${err}`) : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
  });
}
ipcMain.handle("send-wave", async (event, selected) => {
  sendWave(selected);
  return "OK";
});
parser.on(
  "data",
  (line) => {
    const val = parseFloat(line);
    if (!isNaN(val)) {
      waveData.push(val);
      win == null ? void 0 : win.webContents.send("wave-val", val);
    } else {
      console.log("main.ts >> Full wave: ", waveData);
      win == null ? void 0 : win.webContents.send("complete-wave", waveData);
      waveData = [];
    }
  }
);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
