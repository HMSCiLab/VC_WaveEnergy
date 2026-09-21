import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ContextProvider from "../src/AppContext";
import WaveSelectorPage from "../src/pages/WaveSelectorPage";
import waveConfig from "../config/customwave.config.json";

vi.mock("../src/components/RiveSlider", () => ({
  default: ({
    onSelectionChange,
    rivFile,
  }: {
    onSelectionChange?: (index: number) => void;
    rivFile: string;
  }) => (
    <div
      data-testid={
        rivFile.includes("height") ? "height-slider" : "period-slider"
      }
    >
      <button onClick={() => onSelectionChange?.(2)}>select-index-2</button>
    </div>
  ),
}));

const invoke = vi.mocked(window.ipcRenderer.invoke);

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
      screen.getByTestId("height-slider").querySelector("button")!,
    );
    fireEvent.click(
      screen.getByTestId("period-slider").querySelector("button")!,
    );
    fireEvent.click(screen.getByRole("button", { name: /Go/ }));

    await waitFor(() => {
      expect(invoke).toHaveBeenCalledWith("send-wave", {
        height: 1220,
        period: 6,
      });
    });
  });
});
