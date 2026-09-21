import { vi } from "vitest";

type IpcListener = (event: unknown, ...args: unknown[]) => void;
type InvokeHandler = (
  channel: string,
  payload?: unknown,
) => unknown | Promise<unknown>;

export function createMockIpcBridge(invokeHandler: InvokeHandler) {
  const listeners = new Map<string, Set<IpcListener>>();

  const emit = (channel: string, ...args: unknown[]) => {
    for (const listener of listeners.get(channel) ?? []) {
      listener({}, ...args);
    }
  };

  const addListener = (channel: string, listener: IpcListener) => {
    const channelListeners = listeners.get(channel) ?? new Set<IpcListener>();
    channelListeners.add(listener);
    listeners.set(channel, channelListeners);
  };

  const removeListener = (channel: string, listener: IpcListener) => {
    listeners.get(channel)?.delete(listener);
  };

  return {
    emit,
    ipcRenderer: {
      invoke: vi.fn(invokeHandler),
      on: vi.fn((channel: string, listener: IpcListener) => {
        addListener(channel, listener);
      }),
      once: vi.fn((channel: string, listener: IpcListener) => {
        const onceListener: IpcListener = (event, ...args) => {
          removeListener(channel, onceListener);
          listener(event, ...args);
        };
        addListener(channel, onceListener);
      }),
      off: vi.fn((channel: string, listener: IpcListener) => {
        removeListener(channel, listener);
      }),
      send: vi.fn(),
    },
  };
}
