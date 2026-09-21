import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import waveConfig from "../config/customwave.config.json";
import ContextProvider from "../src/AppContext";
import StartPage from "../src/pages/StartPage";
import WaveSelectorPage from "../src/pages/WaveSelectorPage";
import WaveReadPage from "../src/pages/WaveReadPage";
import { createMockArduinoBinding } from "./support/mockArduinoBinding";
import { createMockIpcBridge } from "./support/mockIpcBridge";

const { ipcHandlers } = vi.hoisted(() => ({
  ipcHandlers: new Map<string, (...args: never[]) => unknown>(),
}));

vi.mock("electron", () => ({
  app: {
    getPath: () => "/tmp/vc-wave-energy-custom-wave-test",
  },
  ipcMain: {
    handle: vi.fn((channel, handler) => {
      ipcHandlers.set(channel, handler);
    }),
  },
}));

vi.mock("../src/components/RiveSlider", async () => {
  const { MockRiveSlider } = await import("./support/mockRiveSlider");
  return { default: MockRiveSlider };
});

vi.mock("@rive-app/react-canvas", () => ({
  Alignment: { Center: "center" },
  Fit: { Contain: "contain" },
  Layout: class Layout {},
  useRive: () => ({
    rive: {},
    RiveComponent: () => <div data-testid="rive-power-meter" />,
  }),
  useStateMachineInput: () => ({ value: 1 }),
}));

describe("custom wave happy path", () => {
  let bridge: ReturnType<typeof createMockIpcBridge>;
  let serialEvents: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    bridge = createMockIpcBridge(async (channel, payload) => {
      if (channel === "arduino-status") {
        return { connected: true };
      }
      if (channel === "get-height-options") {
        return waveConfig.height_selection_options;
      }
      if (channel === "get-period-options") {
        return waveConfig.period_selection_options;
      }
      if (channel === "send-wave") {
        return ipcHandlers.get("send-wave")?.({}, payload);
      }
      return undefined;
    });
    Object.defineProperty(window, "ipcRenderer", {
      configurable: true,
      writable: true,
      value: bridge.ipcRenderer,
    });

    ipcHandlers.clear();
    serialEvents = vi.fn((channel: string, ...args: unknown[]) => {
      bridge.emit(channel, ...args);
    });

    const { initArduino, registerArduinoHandlers, stopArduino } =
      await import("../electron/arduinoInterface");
    stopArduino();
    initArduino(serialEvents, createMockArduinoBinding());
    await vi.waitFor(() =>
      expect(serialEvents).toHaveBeenCalledWith("arduino-connected"),
    );
    registerArduinoHandlers();
  });

  afterEach(async () => {
    const { stopArduino } = await import("../electron/arduinoInterface");
    stopArduino();
  });

  it("selects a custom wave, runs the meter, shows the result, and returns home", async () => {
    render(
      <ContextProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/wave-selector-page" element={<WaveSelectorPage />} />
            <Route path="/wave-read-page" element={<WaveReadPage />} />
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "Make your own wave" }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "select-height-index-6" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "select-period-index-4" }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Go/ }));

    await waitFor(() =>
      expect(bridge.ipcRenderer.invoke).toHaveBeenCalledWith("send-wave", {
        height: 3660,
        period: 10,
      }),
    );
    await waitFor(() =>
      expect(serialEvents).toHaveBeenCalledWith("start-wave"),
    );
    await waitFor(() =>
      expect(serialEvents).toHaveBeenCalledWith("complete-wave", [
        1,
        2,
        3,
      ]),
    );

    await waitFor(() =>
      expect(screen.getByTestId("rive-power-meter")).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.getByText(/If scaled to its true ocean size of 12 feet/),
      ).toHaveTextContent("12 feet"),
    );
    expect(
      screen.getByText(/If scaled to its true ocean size/),
    ).toHaveTextContent("10 seconds");
    expect(
      screen.getByText(/If scaled to its true ocean size/),
    ).toHaveTextContent("27 hours of air conditioning");

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Make your own wave" }),
      ).toBeInTheDocument(),
    );
  });
});
