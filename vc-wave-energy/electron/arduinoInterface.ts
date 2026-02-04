import { ipcMain } from "electron";
import { IpcSender } from "./types/ipc";
import { createRequire } from 'node:module'
import { 
  FEATHER_PRODUCT_ID, 
  FEATHER_VENDOR_ID,
  BAUD_RATE,
} from "./config";
import JSON5 from 'json5'

const require = createRequire(import.meta.url);
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

function decomposeLine(line: string): {mssg: string, data: number} {
  line += '}';
  return JSON5.parse(line)
}

async function tryArduinoConnection(){
  const ports = await SerialPort.list();
  const arduinoPort = ports.find((p: any) => 
    p.vendorId && (
      p.vendorId === FEATHER_VENDOR_ID||
      p.productId === FEATHER_PRODUCT_ID
    )
  );

  if (!arduinoPort) {
    if (port && port.isOpen) {
      port.close();
      port = null;
      send("main.ts >> Arduino not connected.")
    }
    return;
  }

  // Do nothing if connected
  if (port && port.isOpen) return;

  port = new SerialPort({
    path: arduinoPort.path,
    baudRate: BAUD_RATE
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

  // parser = port.pipe(new ReadlineParser({delimiter: '\n'}));
  parser = port.pipe(new ReadlineParser({delimiter: '}'}));

  // Receive serial info from arduino
  parser.on('data', (line: string) => {
    const response: {mssg: string, data: number} = decomposeLine(line);
    console.log("Message: " + response.mssg);
    switch(response.mssg) {
      case "DEBUG":
        console.log(response.data);
        break;
      case "EOT":
        send("complete-wave", waveData);
        waveData = [];
        break;
      case "WAVEDATA":
        waveData.push(response.data);
        send("wave-val", response.data);
        break;
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

    ipcMain.handle('send-wave', async(event, selected) => {
        // selected -> {size: number, period: number}
        const cmmd: string = JSON.stringify(selected);
        port.write(cmmd + '\n', (err: Error | null | undefined) => {
            err 
            ? console.log(`main.ts >> Error sending command to arduino: ${err}`) 
            : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
        });
        return 'OK';
    });
}