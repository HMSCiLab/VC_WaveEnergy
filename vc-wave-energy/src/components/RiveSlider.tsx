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
}

function RiveSlider({ rivFile, onSelectionChange }: Props) {
  const { heightOptions, periodOptions } = useWaveSelector();

  const { rive, RiveComponent } = useRive({
    src: rivFile,
    stateMachines: "SlideMachine",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
    }),
  });

  const viewModel = useViewModel(rive, { name: "View Model 1" });
  const vmi = useViewModelInstance(viewModel, { rive });

  const { value: selection1 } = useViewModelInstanceBoolean("selection1", vmi);
  const { value: selection2 } = useViewModelInstanceBoolean("selection2", vmi);
  const { value: selection3 } = useViewModelInstanceBoolean("selection3", vmi);
  const { value: selection4 } = useViewModelInstanceBoolean("selection4", vmi);
  const { value: selection5 } = useViewModelInstanceBoolean("selection5", vmi);
  const { value: selection6 } = useViewModelInstanceBoolean("selection6", vmi);

  const activeIndex = selection1
    ? 1
    : selection2
      ? 2
      : selection3
        ? 3
        : selection4
          ? 4
          : selection5
            ? 5
            : selection6
              ? 6
              : 0;

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
        `${periodOptions[2].period} seconds`,
      );
      rive.setTextRunValue(
        "periodLabel2",
        `${periodOptions[4].period} seconds`,
      );
    }
  }, [rive]);

  return <RiveComponent />;
}

export default RiveSlider;
