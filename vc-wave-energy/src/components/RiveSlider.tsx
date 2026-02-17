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

interface Props {
  rivFile: string;
  onSelectionChange?: (index: number) => void;
}

function RiveHeightSlider({ rivFile, onSelectionChange }: Props) {
  const { rive, RiveComponent } = useRive({
    // src: "/src/assets/slider.riv",
    src: rivFile,
    stateMachines: "SlideMachine",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
    }),
  });

  const heightViewModel = useViewModel(rive, { name: "View Model 1" });
  const heightVMI = useViewModelInstance(heightViewModel, { rive });

  const { value: selection1 } = useViewModelInstanceBoolean("selection1", heightVMI);
  const { value: selection2 } = useViewModelInstanceBoolean("selection2", heightVMI);
  const { value: selection3 } = useViewModelInstanceBoolean("selection3", heightVMI);
  const { value: selection4 } = useViewModelInstanceBoolean("selection4", heightVMI);
  const { value: selection5 } = useViewModelInstanceBoolean("selection5", heightVMI);
  const { value: selection6 } = useViewModelInstanceBoolean("selection6", heightVMI);

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

  return <RiveComponent />;
}

export default RiveHeightSlider;
