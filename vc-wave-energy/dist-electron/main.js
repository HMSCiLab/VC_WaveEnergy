import { ipcMain, app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import path from "node:path";
const require2 = createRequire(import.meta.url);
const { SerialPort } = require2("serialport");
const { ReadlineParser } = require2("@serialport/parser-readline");
let port = null;
let waveData = [];
let parser = null;
let send;
function initArduino(sender) {
  send = sender;
  setInterval(tryArduinoConnection, 1e3);
}
async function tryArduinoConnection() {
  const ports = await SerialPort.list();
  const arduinoPort = ports.find(
    (p) => p.vendorId && (p.vendorId === "239a" || p.productId === "800b")
  );
  if (!arduinoPort) {
    if (port && port.isOpen) {
      port.close();
      port = null;
      send("main.ts (97) >> Arduino not connected.");
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
    send("arduino-connected");
  });
  port.on("close", () => {
    console.log("main.ts >> Arduino disconnected");
    port = null;
    send("arduino-disconnected");
  });
  port.on("error", (err) => {
    console.log("main.ts >> Arduino not connected.");
    send("arduino-error", err.message);
  });
  parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  parser.on(
    "data",
    (line) => {
      const val = parseFloat(line);
      if (isNaN(val)) {
        console.log(line);
        if (line === "Wave complete") {
          console.log("main.ts >> Full wave: ", waveData);
          send("complete-wave", waveData);
          waveData = [];
        } else {
          console.log("main.ts >> Message from arduino: ", line);
        }
      } else {
        waveData.push(val);
        send("wave-val", val);
      }
    }
  );
}
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
function registerArduinoHandlers() {
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
}
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
    },
    width: 1024,
    height: 1366
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
app.whenReady().then(() => {
  createWindow();
  initArduino(safeSend);
  registerArduinoHandlers();
});
function safeSend(channel, ...args) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, ...args);
  }
}
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
app.on("before-quit", cleanup);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  safeSend
};
