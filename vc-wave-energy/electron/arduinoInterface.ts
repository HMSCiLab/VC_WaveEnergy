import { ipcMain } from "electron";
import { IpcSender } from "./types/ipc";
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');


// PORT CREATION
let port: any = null;
let waveData: number[] = [];
let parser: any = null;
let send: IpcSender;

export function initArduino(sender: IpcSender) {
    send = sender;
    setInterval(tryArduinoConnection, 1000);
}

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
      send("main.ts (97) >> Arduino not connected.")
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
    send("arduino-connected");
  })
  
  port.on("close", () => {
    console.log("main.ts >> Arduino disconnected");
    port = null;
    send("arduino-disconnected");
  })

  port.on('error', (err: Error) => {
    console.log("main.ts >> Arduino not connected.");
    send("arduino-error", err.message);
  })

  parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

  // Receive serial info from arduino
  parser.on('data', (line: string) => {
    const val: number = parseFloat(line);
    if (isNaN(val)) {
        console.log(line);
        if (line === "Wave complete") {
            console.log("main.ts >> Full wave: ", waveData)
            send("complete-wave", waveData);
            waveData = [];
        } 
        else {
        console.log("main.ts >> Message from arduino: ", line); 
        }
    }
    else {
        waveData.push(val);
        send("wave-val", val);
    }}
  );
}

// CLEANUP
export function cleanup(){
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

// HANDLERS
export function registerArduinoHandlers() {
    ipcMain.handle("arduino-status", () => {
        return { connected: !!(port && port.isOpen) }
    })

    ipcMain.handle('send-wave', async(selected) => {
        const cmmd: string = JSON.stringify(selected);
        port.write(cmmd + '\n', (err: Error | null | undefined) => {
            err 
            ? console.log(`main.ts >> Error sending command to arduino: ${err}`) 
            : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
        });
        return 'OK';
    });
}