import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
const require2 = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { SerialPort } = require2("serialport");
const { ReadlineParser } = require2("@serialport/parser-readline");
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
function safeSend(channel, ...args) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, ...args);
  }
}
let port = null;
let waveData = [];
let parser = null;
async function tryArduinoConnection() {
  const ports = await SerialPort.list();
  const arduinoPort = ports.find(
    (p) => p.vendorId && (p.vendorId === "239a" || p.productId === "800b")
  );
  if (!arduinoPort) {
    if (port && port.isOpen) {
      port.close();
      port = null;
      safeSend("main.ts (97) >> Arduino not connected.");
    }
    return;
  }
  if (port && port.isOpen) return;
  port = new SerialPort({
    path: arduinoPort.path,
    baudRate: 9600
  });
  port.on("open", () => {
    console.log("main.ts >> Arduino connected", arduinoPort.path);
    safeSend("arduino-connected");
  });
  port.on("close", () => {
    console.log("main.ts >> Arduino disconnected");
    port = null;
    safeSend("arduino-disconnected");
  });
  port.on("error", (err) => {
    console.log("main.ts >> Arduino not connected.");
    safeSend("arduino-error", err.message);
  });
  parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  parser.on(
    "data",
    (line) => {
      const val = parseFloat(line);
      if (!isNaN(val)) {
        waveData.push(val);
        safeSend("wave-val", val);
      } else {
        console.log("main.ts >> Full wave: ", waveData);
        safeSend("complete-wave", waveData);
        waveData = [];
      }
    }
  );
}
setInterval(tryArduinoConnection, 1e3);
function cleanup() {
  console.log("main.ts >> Shutting down app");
  if (port && port.isOpen) {
    try {
      port.close();
      console.log("main.ts >> Port closed");
    } catch (err) {
      console.log("main.ts >> Error: ", err);
    }
  }
  process.exit(0);
}
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
app.on("before-quit", cleanup);
ipcMain.handle("arduino-status", () => {
  return { connected: !!(port && port.isOpen) };
});
ipcMain.handle("send-wave", async (selected) => {
  const cmmd = JSON.stringify(selected);
  port.write(cmmd + "\n", (err) => {
    err ? console.log(`main.ts >> Error sending command to arduino: ${err}`) : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
  });
  return "OK";
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
