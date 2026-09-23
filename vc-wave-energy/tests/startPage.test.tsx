import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ContextProvider from "../src/AppContext";
import StartPage from "../src/pages/StartPage";
import { createMockArduinoBinding } from "./support/mockArduinoBinding";

vi.mock("electron", () => ({
  app: {
    getPath: () => "/tmp/vc-wave-energy-start-page-test",
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

const invoke = vi.mocked(window.ipcRenderer.invoke);

const buoyData = {
  success: true,
  data: {
    stationID: 277,
    ts: new Date(Date.now() - 60 * 60 * 1000),
    lat: 44.6,
    long: -124.1,
    height: 1,
    period: 6,
    wavePower: 10,
  },
  err: null,
};

describe("StartPage real-time waves", () => {
  beforeEach(() => {
    stopArduino();
    vi.mocked(ipcMain.handle).mockClear();
    invoke.mockImplementation(async (channel) => {
      if (channel === "arduino-status") {
        return { connected: true };
      }
      if (channel === "get-drive-data") {
        return buoyData;
      }
      if (channel === "send-wave") {
        return "OK";
      }
      return undefined;
    });
  });

  afterEach(() => {
    cleanup();
    stopArduino();
  });

  it("loads buoy data, sends the converted wave, and navigates", async () => {
    const serialEvents = vi.fn();
    initArduino(serialEvents, createMockArduinoBinding());
    await vi.waitFor(() =>
      expect(serialEvents).toHaveBeenCalledWith("arduino-connected"),
    );
    registerArduinoHandlers();
    const sendWaveHandler = vi
      .mocked(ipcMain.handle)
      .mock.calls.find(([channel]) => channel === "send-wave")?.[1];

    let resolveDriveData!: (value: typeof buoyData) => void;
    const driveData = new Promise<typeof buoyData>((resolve) => {
      resolveDriveData = resolve;
    });
    invoke.mockImplementation(async (channel, payload) => {
      if (channel === "arduino-status") {
        return { connected: true };
      }
      if (channel === "get-drive-data") {
        return driveData;
      }
      if (channel === "send-wave") {
        return sendWaveHandler?.({}, payload);
      }
      return undefined;
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/wave-read-page"
              element={<div data-testid="wave-read-page" />}
            />
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "See real-time waves" }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "See real-time waves" }),
    );

    expect(screen.getByText("See real-time Waves")).toBeInTheDocument();
    resolveDriveData(buoyData);

    await waitFor(() =>
      expect(invoke).toHaveBeenCalledWith("send-wave", {
        height: 3.28,
        period: 6,
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("wave-read-page")).toBeInTheDocument(),
    );
    await vi.waitFor(() => {
      expect(serialEvents).toHaveBeenCalledWith("start-wave");
      expect(serialEvents).toHaveBeenCalledWith("wave-val", 1);
      expect(serialEvents).toHaveBeenCalledWith("wave-val", 2);
      expect(serialEvents).toHaveBeenCalledWith("wave-val", 3);
      expect(serialEvents).toHaveBeenCalledWith("complete-wave", [1, 2, 3]);
    });
  });

  it("sends a 10ft, 6s fallback when buoy data is stale", async () => {
    const staleBuoyData = {
      ...buoyData,
      data: {
        ...buoyData.data,
        ts: new Date(Date.now() - 7 * 60 * 60 * 1000),
      },
    };
    invoke.mockImplementation(async (channel) => {
      if (channel === "arduino-status") {
        return { connected: true };
      }
      if (channel === "get-drive-data") {
        return staleBuoyData;
      }
      if (channel === "send-wave") {
        return "OK";
      }
      return undefined;
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/wave-read-page"
              element={<div data-testid="wave-read-page" />}
            />
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "See real-time waves" }),
    );

    await waitFor(() =>
      expect(invoke).toHaveBeenCalledWith("send-wave", {
        height: 10,
        period: 6,
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("wave-read-page")).toBeInTheDocument(),
    );
  });

  it("sends a 10ft, 6s fallback when buoy data cannot be parsed", async () => {
    invoke.mockImplementation(async (channel) => {
      if (channel === "arduino-status") {
        return { connected: true };
      }
      if (channel === "get-drive-data") {
        return { success: false, data: null, err: {} };
      }
      if (channel === "send-wave") {
        return "OK";
      }
      return undefined;
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/wave-read-page"
              element={<div data-testid="wave-read-page" />}
            />
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "See real-time waves" }),
    );

    await waitFor(() =>
      expect(invoke).toHaveBeenCalledWith("send-wave", {
        height: 10,
        period: 6,
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("wave-read-page")).toBeInTheDocument(),
    );
  });
});
