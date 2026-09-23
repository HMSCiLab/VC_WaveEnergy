import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ContextProvider, { useAppContext } from "../src/AppContext";
import { useEffect } from "react";
import WaveSelectorPage from "../src/pages/WaveSelectorPage";
import waveConfig from "../config/customwave.config.json";

vi.mock("../src/components/RiveSliderInteraction", async () => {
  const { MockSlider } = await import("./support/mockSlider");
  return { default: MockSlider };
});

const invoke = vi.mocked(window.ipcRenderer.invoke);
const selectedHeight = waveConfig.height_selection_options[2].height;
const selectedPeriod = waveConfig.period_selection_options[2].period;

function SeedPreviousSelection() {
  const { setActiveHeightIndex, setActivePeriodIndex } = useAppContext();

  useEffect(() => {
    setActiveHeightIndex(4);
    setActivePeriodIndex(5);
  }, [setActiveHeightIndex, setActivePeriodIndex]);

  return null;
}

describe("wave selector", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    invoke.mockImplementation(async (channel) => {
      if (channel === "get-height-options") {
        return waveConfig.height_selection_options;
      }
      if (channel === "get-period-options") {
        return waveConfig.period_selection_options;
      }
      return undefined;
    });
  });

  it("sends the selected height converted to millimeters and period in seconds", async () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <WaveSelectorPage />
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("height-slider")).toBeInTheDocument(),
    );
    fireEvent.click(
      screen.getByRole("radio", { name: `${selectedHeight} feet` }),
    );
    fireEvent.click(
      screen.getByRole("radio", { name: `${selectedPeriod} seconds` }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Go/ }));

    await waitFor(() => {
      expect(invoke).toHaveBeenCalledWith("send-wave", {
        height: 1830,
        period: selectedPeriod,
      });
    });
  });

  it("resets to the smallest wave when entering with a previous selection", async () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <SeedPreviousSelection />
          <WaveSelectorPage />
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("height-slider")).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole("button", { name: /Go/ }));

    await waitFor(() => {
      expect(invoke).toHaveBeenCalledWith("send-wave", {
        height: 610,
        period: 3,
      });
    });
  });
});
