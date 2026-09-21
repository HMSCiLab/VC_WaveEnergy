import { MockBinding } from "@serialport/binding-mock";
import arduinoConfig from "../../config/arduino.config.json";

const MOCK_PATH = "/dev/mock-arduino";
const MOCK_VENDOR_ID = arduinoConfig.ports.r4minima_vendor_id;
const MOCK_PRODUCT_ID = arduinoConfig.ports.r4minima_product_id;
const RESPONSE =
  '{"channel":"SOT","mssg":"","data":0}{"channel":"WAVEDATA","mssg":"","data":1}{"channel":"WAVEDATA","mssg":"","data":2}{"channel":"WAVEDATA","mssg":"","data":3}{"channel":"EOT","mssg":"","data":0}';

export function createMockArduinoBinding() {
  MockBinding.reset();
  MockBinding.createPort(MOCK_PATH, {
    vendorId: MOCK_VENDOR_ID,
    productId: MOCK_PRODUCT_ID,
  });

  return {
    ...MockBinding,
    async open(options: Parameters<typeof MockBinding.open>[0]) {
      const port = await MockBinding.open(options);
      const write = port.write.bind(port);
      port.write = async (buffer) => {
        await write(buffer);
        setTimeout(() => port.emitData(RESPONSE), 0);
      };
      return port;
    },
  };
}
