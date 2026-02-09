"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event2, ...args2) => listener(event2, ...args2));
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
});
const PACWAVE_API = {
  requestWaveData: () => {
    electron.ipcRenderer.invoke("get-wave-data");
  }
};
const ARDUINO_API = {
  sendWave: (selected) => {
    if (selected.size !== void 0 || selected.period !== void 0) {
      electron.ipcRenderer.invoke("send-wave", event, selected);
    } else {
      electron.ipcRenderer.invoke("send-wave", event, {
        size: 3,
        period: 7
      });
    }
  }
};
electron.contextBridge.exposeInMainWorld("arduinoAPI", ARDUINO_API);
electron.contextBridge.exposeInMainWorld("pacwaveAPI", PACWAVE_API);
