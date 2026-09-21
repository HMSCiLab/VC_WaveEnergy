import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useEffect } from "react";
import ContextProvider, { useAppContext } from "../src/AppContext";
import WaveReadPage from "../src/pages/WaveReadPage";
import { createMockIpcBridge } from "./support/mockIpcBridge";

const { riveInput } = vi.hoisted(() => {
  const input = { current: 1 };
  return { riveInput: input };
});

const animationValues = [10, 20, 30];

vi.mock("../src/page-logic/waveInfoLogic", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/page-logic/waveInfoLogic")>();
  return {
    ...actual,
    computeEnergy: () => ({
      animationNums: animationValues,
      kilowattHours: 42,
    }),
  };
});

const riveStateMachineInput = {
  get value() {
    return riveInput.current;
  },
  set value(value: number) {
    riveInput.current = value;
  },
};

vi.mock("@rive-app/react-canvas", () => ({
  Alignment: { Center: "center" },
  Fit: { Contain: "contain" },
  Layout: class Layout {},
  useRive: () => ({
    rive: {},
    RiveComponent: () => <div data-testid="rive-power-meter" />,
  }),
  useStateMachineInput: () => riveStateMachineInput,
}));

function SeedWaveSelection() {
  const { setSelectedHeight, setSelectedPeriod } = useAppContext();

  useEffect(() => {
    setSelectedHeight(12);
    setSelectedPeriod(10);
  }, [setSelectedHeight, setSelectedPeriod]);

  return null;
}

describe("power meter animation loop", () => {
  let bridge: ReturnType<typeof createMockIpcBridge>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
      setTimeout(() => callback(0), 0),
    );
    vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
    bridge = createMockIpcBridge(async () => undefined);
    Object.defineProperty(window, "ipcRenderer", {
      configurable: true,
      writable: true,
      value: bridge.ipcRenderer,
    });
    riveInput.current = 1;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("updates the Rive energy input after SOT and completes on EOT", async () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <SeedWaveSelection />
          <WaveReadPage />
        </MemoryRouter>
      </ContextProvider>,
    );

    expect(screen.getByTestId("rive-power-meter")).toBeInTheDocument();
    expect(screen.getByText("Generating electricity...")).toBeInTheDocument();

    await act(async () => {
      bridge.emit("start-wave");
      await Promise.resolve();
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(riveInput.current).not.toBe(1);

    await act(async () => {
      bridge.emit("complete-wave", [1, 2, 3]);
      await Promise.resolve();
    });
    expect(
      screen.getByText(/If scaled to its true ocean size of 12 feet/),
    ).toBeInTheDocument();
  });
});
