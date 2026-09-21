import {
  PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from "react";
import RiveSlider from "./RiveSlider";

type Props = {
  rivFile: string;
  optionCount: number;
  value: number;
  onSelectionChange: (index: number) => void;
  label: string;
};

function indexFromPointer(
  clientY: number,
  top: number,
  height: number,
  optionCount: number,
) {
  if (optionCount <= 1 || height <= 0) return 1;
  const position = Math.min(
    1,
    Math.max(0, (top + height - clientY) / height),
  );
  return Math.round(position * (optionCount - 1)) + 1;
}

function RiveSliderInteraction({
  rivFile,
  optionCount,
  value,
  onSelectionChange,
  label,
}: Props) {
  const hitBoxRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const updateFromPointer = (clientY: number) => {
    const bounds = hitBoxRef.current?.getBoundingClientRect();
    if (!bounds) return;
    onSelectionChange(
      indexFromPointer(clientY, bounds.top, bounds.height, optionCount),
    );
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
      return;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    updateFromPointer(event.clientY);
    draggingRef.current = false;
    pointerIdRef.current = null;
    setDragging(false);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerIdRef.current = event.pointerId;
    draggingRef.current = true;
    setDragging(true);
    updateFromPointer(event.clientY);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      draggingRef.current &&
      pointerIdRef.current === event.pointerId
    ) {
      updateFromPointer(event.clientY);
    }
  };

  return (
    <div
      aria-label={label}
      className="relative h-full w-full"
      data-dragging={dragging}
      data-testid={`${label.replace(/ /g, "-")}-interaction`}
      ref={hitBoxRef}
      style={{ touchAction: "none" }}
      onPointerDownCapture={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
    >
      <RiveSlider
        rivFile={rivFile}
        onSelectionChange={() => undefined}
        selectedIndex={value}
      />
    </div>
  );
}

export default RiveSliderInteraction;
