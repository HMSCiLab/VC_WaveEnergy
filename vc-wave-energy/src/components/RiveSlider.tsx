import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceBoolean,
} from "@rive-app/react-canvas";
import { useEffect } from "react";
import useWaveSelector from "../page-logic/waveSelectorLogic";

interface Props {
  rivFile: string;
  onSelectionChange?: (index: number) => void;
  selectedIndex?: number;
}

function RiveSlider({ rivFile, onSelectionChange, selectedIndex }: Props) {
  const { heightOptions, periodOptions } = useWaveSelector();

  const { rive, RiveComponent } = useRive({
    src: rivFile,
    stateMachines: "SlideMachine",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
    }),
  });

  const viewModel = useViewModel(rive, { name: "ViewModel1" });
  const vmi = useViewModelInstance(viewModel, { rive });

  const selection1 = useViewModelInstanceBoolean("selection1", vmi);
  const selection2 = useViewModelInstanceBoolean("selection2", vmi);
  const selection3 = useViewModelInstanceBoolean("selection3", vmi);
  const selection4 = useViewModelInstanceBoolean("selection4", vmi);
  const selection5 = useViewModelInstanceBoolean("selection5", vmi);
  const selection6 = useViewModelInstanceBoolean("selection6", vmi);

  const activeIndex = selection1.value
    ? 1
    : selection2.value
      ? 2
      : selection3.value
        ? 3
        : selection4.value
          ? 4
          : selection5.value
            ? 5
            : selection6.value
              ? 6
              : 0;

  useEffect(() => {
    if (!selectedIndex) return;
    [
      selection1,
      selection2,
      selection3,
      selection4,
      selection5,
      selection6,
    ].forEach((selection, index) =>
      selection.setValue(index + 1 === selectedIndex),
    );
  }, [
    selectedIndex,
    selection1,
    selection2,
    selection3,
    selection4,
    selection5,
    selection6,
  ]);

  useEffect(() => {
    onSelectionChange?.(activeIndex);
  }, [activeIndex, onSelectionChange]);

  // Set text labels
  useEffect(() => {
    if (!rive) return;

    if (rivFile.includes("height")) {
      rive.setTextRunValue("heightLabel1", `${heightOptions[1].height} feet`);
      rive.setTextRunValue("heightLabel2", `${heightOptions[3].height} feet`);
      rive.setTextRunValue("heightLabel3", `${heightOptions[5].height} feet`);
    } else {
      rive.setTextRunValue(
        "periodLabel1",
        `${periodOptions[0].period} seconds`,
      );
      rive.setTextRunValue(
        "periodLabel2",
        `${periodOptions[2].period} seconds`,
      );
      rive.setTextRunValue(
        "periodLabel3",
        `${periodOptions[4].period} seconds`,
      );
    }
  }, [heightOptions, periodOptions, rive, rivFile]);

  return <RiveComponent />;
}

export default RiveSlider;
