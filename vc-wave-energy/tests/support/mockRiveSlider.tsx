type MockRiveSliderProps = {
  onSelectionChange?: (index: number) => void;
  rivFile: string;
};

export function MockRiveSlider({
  onSelectionChange,
  rivFile,
}: MockRiveSliderProps) {
  const isHeight = rivFile.includes("height");
  const sliderName = isHeight ? "height" : "period";

  return (
    <div data-testid={`${sliderName}-slider`}>
      {Array.from({ length: 6 }, (_, index) => {
        const selectionIndex = index + 1;
        return (
          <button
            key={selectionIndex}
            onClick={() => onSelectionChange?.(selectionIndex)}
          >
            select-{sliderName}-index-{selectionIndex}
          </button>
        );
      })}
    </div>
  );
}
