"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
const PACWAVE_API = {
  requestWaveData: () => {
    electron.ipcRenderer.invoke("get-wave-data");
  }
};
const ARDUINO_API = {
  sendWave: (selected) => {
    electron.ipcRenderer.invoke("send-wave", selected);
  }
};
electron.contextBridge.exposeInMainWorld("arduinoAPI", ARDUINO_API);
electron.contextBridge.exposeInMainWorld("pacwaveAPI", PACWAVE_API);
