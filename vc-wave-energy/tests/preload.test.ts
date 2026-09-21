import { beforeEach, describe, expect, it, vi } from "vitest";

const { contextBridge, ipcRenderer, exposed } = vi.hoisted(() => ({
  contextBridge: { exposeInMainWorld: vi.fn() },
  ipcRenderer: {
    on: vi.fn(),
    off: vi.fn(),
    send: vi.fn(),
    invoke: vi.fn(),
    once: vi.fn(),
  },
  exposed: new Map<string, Record<string, (...args: never[]) => unknown>>(),
}));

vi.mock("electron", () => ({ contextBridge, ipcRenderer }));

describe("Electron preload API", () => {
  beforeEach(async () => {
    vi.resetModules();
    exposed.clear();
    vi.mocked(contextBridge.exposeInMainWorld).mockImplementation((name, api) => {
      exposed.set(name, api as Record<string, (...args: never[]) => unknown>);
    });
    await import("../electron/preload");
  });

  it("delegates IPC wrappers and preserves their return values", () => {
    const api = exposed.get("ipcRenderer")!;
    const listener = vi.fn();
    const expected = {};
    vi.mocked(ipcRenderer.on).mockReturnValue(expected as never);
    vi.mocked(ipcRenderer.off).mockReturnValue(expected as never);
    vi.mocked(ipcRenderer.send).mockReturnValue(expected as never);
    vi.mocked(ipcRenderer.invoke).mockReturnValue(expected as never);
    vi.mocked(ipcRenderer.once).mockReturnValue(expected as never);

    expect(api.on("wave", listener)).toBe(expected);
    expect(api.off("wave", listener)).toBe(expected);
    expect(api.send("wave", 1)).toBe(expected);
    expect(api.invoke("wave", 1)).toBe(expected);
    expect(api.once("wave", listener)).toBe(expected);
    expect(ipcRenderer.on).toHaveBeenCalled();
    expect(ipcRenderer.off).toHaveBeenCalledWith("wave", listener);
    expect(ipcRenderer.send).toHaveBeenCalledWith("wave", 1);
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("wave", 1);
    expect(ipcRenderer.once).toHaveBeenCalledWith("wave", listener);
  });

  it("routes Arduino and PacWave APIs to their IPC channels", async () => {
    const arduino = exposed.get("arduinoAPI")!;
    const pacwave = exposed.get("pacwaveAPI")!;
    vi.mocked(ipcRenderer.invoke).mockResolvedValue("result");

    expect(arduino.sendWave({ size: 4, period: 10 })).toBeUndefined();
    expect(arduino.selectionOptions()).toBeUndefined();
    expect(pacwave.requestWaveData()).toBeUndefined();
    expect(pacwave.requestSharedWaveData()).toBeUndefined();

    expect(ipcRenderer.invoke).toHaveBeenCalledWith("send-wave", undefined, {
      size: 4,
      period: 10,
    });
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("get-height-options", undefined);
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("get-period-options", undefined);
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("get-wave-data");
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("get-drive-data");
  });
});
