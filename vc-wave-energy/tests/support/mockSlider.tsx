import waveConfig from "../../config/customwave.config.json";

type MockSliderProps = {
  onSelectionChange?: (index: number) => void;
  rivFile: string;
};

export function MockSlider({ onSelectionChange, rivFile }: MockSliderProps) {
  const isHeight = rivFile.includes("height");
  const options = isHeight
    ? waveConfig.height_selection_options.map(({ height }) => ({
        label: `${height} feet`,
      }))
    : waveConfig.period_selection_options.map(({ period }) => ({
        label: `${period} seconds`,
      }));
  const sliderName = isHeight ? "height" : "period";

  return (
    <div
      aria-label={`${sliderName} selection`}
      data-testid={`${sliderName}-slider`}
      role="radiogroup"
    >
      {options.map(({ label }, index) => (
        <button
          aria-label={label}
          aria-checked={false}
          key={label}
          onClick={() => onSelectionChange?.(index + 1)}
          role="radio"
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
