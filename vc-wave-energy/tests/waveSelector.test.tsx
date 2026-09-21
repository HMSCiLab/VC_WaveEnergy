import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ContextProvider from "../src/AppContext";
import WaveSelectorPage from "../src/pages/WaveSelectorPage";
import waveConfig from "../config/customwave.config.json";

vi.mock("../src/components/RiveSlider", async () => {
  const { MockSlider } = await import("./support/mockSlider");
  return { default: MockSlider };
});

const invoke = vi.mocked(window.ipcRenderer.invoke);
const selectedHeight = waveConfig.height_selection_options[2].height;
const selectedPeriod = waveConfig.period_selection_options[2].period;

describe("wave selector", () => {
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
});
