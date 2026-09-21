import { ipcMain } from "electron";
import { IpcSender } from "./types/ipc";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { 
  FEATHER_PRODUCT_ID, 
  FEATHER_VENDOR_ID,
  BAUD_RATE,
  MINIMA_PRODUCT_ID,
  MINIMA_VENDOR_ID

} from "./config";
import JSON5 from 'json5'

// PORT CREATION
let port: InstanceType<typeof SerialPort> | null = null;
let waveData: number[] = [];
let parser: ReadlineParser | null = null;
let send: IpcSender;
let pollTimer: NodeJS.Timeout | null = null;
let serialBinding: typeof SerialPort.binding = SerialPort.binding;

interface response {
    channel: string;
    mssg: string;
    data: number;
}

type SerialPortInfo = Awaited<ReturnType<typeof SerialPort.list>>[number];

export function initArduino(
    sender: IpcSender,
    binding: typeof SerialPort.binding = SerialPort.binding,
) {
    send = sender;
    serialBinding = binding;
    pollTimer = setInterval(tryArduinoConnection, 1000);
    void tryArduinoConnection();
}

function decomposeLine(line: string): response {
  line += '}';
  return JSON5.parse(line)
}

async function tryArduinoConnection(){
  const ports = await serialBinding.list();
  const arduinoPort = ports.find((p: SerialPortInfo) =>
    p.vendorId && (
      p.vendorId === FEATHER_VENDOR_ID ||
      p.productId === FEATHER_PRODUCT_ID ||
      p.vendorId === MINIMA_VENDOR_ID ||
      p.productId === MINIMA_PRODUCT_ID
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
    baudRate: BAUD_RATE,
    binding: serialBinding,
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
    const resp: response = decomposeLine(line);
    switch(resp.channel) {
      case "DEBUG":
        console.log(`Channel: ${resp.channel}\nMessage:${resp.mssg}\nData: ${resp.data}`);
        break;
      case "SOT":
        send("start-wave");
        console.log("main.ts >> Received SOT!");
        break;
      case "EOT":
        send("complete-wave", waveData);
        waveData = [];
        console.log("main.ts >> Received EOT!");
        break;
      case "WAVEDATA":
        waveData.push(resp.data);
        send("wave-val", resp.data);
        break;
    }
    } 
  );
}

// CLEANUP
export function cleanup(){
  console.log("main.ts >> Shutting down app");
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
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

export function stopArduino() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  if (port && port.isOpen) {
    port.close();
  }
  port = null;
}

// HANDLERS
export function registerArduinoHandlers() {
    ipcMain.handle("arduino-status", () => {
        return { connected: !!(port && port.isOpen) }
    })

    ipcMain.handle('send-wave', async(_event, selected) => {
        // selected -> {height: number, period: number}
        if (!port || !port.isOpen) {
            throw new Error("Arduino is not connected");
        }
        const cmmd: string = JSON.stringify(selected);
        port.write(cmmd + '\n', (err: Error | null | undefined) => {
            err 
            ? console.log(`main.ts >> Error sending command to arduino: ${err}`) 
            : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
        });
        return 'OK';
    });
}