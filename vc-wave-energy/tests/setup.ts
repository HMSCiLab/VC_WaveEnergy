import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

Object.defineProperty(window, "ipcRenderer", {
  writable: true,
  value: {
    invoke: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    once: vi.fn(),
    send: vi.fn(),
  },
});
