import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("electron", () => ({
  app: {
    getPath: () => "/tmp/vc-wave-energy-test",
  },
  ipcMain: {
    handle: vi.fn(),
  },
}));

import { ipcMain } from "electron";
import {
  initArduino,
  registerArduinoHandlers,
  stopArduino,
} from "../electron/arduinoInterface";
import { createMockArduinoBinding } from "./support/mockArduinoBinding";

describe("Arduino interface with the mock binding", () => {
  beforeEach(() => {
    stopArduino();
    vi.mocked(ipcMain.handle).mockClear();
  });

  it("discovers the mock port, sends a wave, and forwards the Arduino response", async () => {
    const send = vi.fn();
    const binding = createMockArduinoBinding();

    initArduino(send, binding);
    await vi.waitFor(() =>
      expect(send).toHaveBeenCalledWith("arduino-connected"),
    );

    registerArduinoHandlers();
    const handlers = new Map(
      vi.mocked(ipcMain.handle).mock.calls.map(([channel, handler]) => [
        channel,
        handler,
      ]),
    );
    const statusHandler = handlers.get("arduino-status");
    const sendWaveHandler = handlers.get("send-wave");
    expect(statusHandler?.({})).toEqual({ connected: true });

    const invoke = vi.fn((channel: string, payload: unknown) => {
      if (channel === "send-wave") {
        return sendWaveHandler?.({}, payload);
      }
      return undefined;
    });
    await invoke("send-wave", { height: 1220, period: 6 });

    await vi.waitFor(() => {
      expect(send).toHaveBeenCalledWith("start-wave");
      expect(send).toHaveBeenCalledWith("wave-val", 1);
      expect(send).toHaveBeenCalledWith("wave-val", 2);
      expect(send).toHaveBeenCalledWith("wave-val", 3);
      expect(send).toHaveBeenCalledWith("complete-wave", [1, 2, 3]);
    });

    stopArduino();
    await vi.waitFor(() =>
      expect(send).toHaveBeenCalledWith("arduino-disconnected"),
    );
  });
});
