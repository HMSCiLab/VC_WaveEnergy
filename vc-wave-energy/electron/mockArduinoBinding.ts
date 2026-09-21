import { MockBinding } from "@serialport/binding-mock";
import { SerialPort } from "serialport";
import arduinoConfig from "../config/arduino.config.json";

const MOCK_PATH = "/dev/mock-arduino";
const MOCK_VENDOR_ID = arduinoConfig.ports.r4minima_vendor_id;
const MOCK_PRODUCT_ID = arduinoConfig.ports.r4minima_product_id;
const RESPONSE =
  '{"channel":"SOT","mssg":"","data":0}{"channel":"WAVEDATA","mssg":"","data":1}{"channel":"WAVEDATA","mssg":"","data":2}{"channel":"WAVEDATA","mssg":"","data":3}{"channel":"EOT","mssg":"","data":0}';

type MockBindingWithOpen = typeof MockBinding & {
  open(
    options: Parameters<typeof SerialPort.binding.open>[0],
  ): ReturnType<typeof SerialPort.binding.open>;
};

export function createMockArduinoBinding() {
  MockBinding.reset();
  MockBinding.createPort(MOCK_PATH, {
    vendorId: MOCK_VENDOR_ID,
    productId: MOCK_PRODUCT_ID,
  });

  return {
    ...MockBinding,
    async open(options: Parameters<typeof SerialPort.binding.open>[0]) {
      const port = await (MockBinding as MockBindingWithOpen).open(options);
      const write = port.write.bind(port);
      port.write = async (buffer: Buffer) => {
        await write(buffer);
        setTimeout(() => {
          if (port.isOpen) {
            port.emitData(RESPONSE);
          }
        }, 0);
      };
      return port;
    },
  };
}
