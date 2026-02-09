import { Link } from "react-router-dom";
import Button from "./util-components/Button";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceBoolean,
} from "@rive-app/react-canvas";
import bgImage from "../assets/background-ocean.jpg";
import ValueRow from "./util-components/ValueRow";
import { useAppContext } from "./util-components/AppContext";

function WaveSelectorPage() {
  const { setSelectedHeight, setSelectedPeriod } = useAppContext();
  const onClick = (text: string) => {
    console.log(
      `Sending wave of size ${selected?.height}m and period of ${selected?.period}s`,
    );
    if (selected) {
      setSelectedHeight(selected?.height);
      setSelectedPeriod(selected?.period);
      window.ipcRenderer.invoke("send-wave", selected);
    }
  };
  const onGoNotReady = () => {
    alert("Please ensure 'Height' and 'Period' above have values.");
  };

  // RIVE SEGMENT
  const { rive, RiveComponent } = useRive({
    src: "/src/assets/slider.riv",
    stateMachines: "SlideMachine",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
    }),
  });

  // Initial strategy: bind View Model at the top level
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

  const options = [
    { height: 3.0, period: 6.0 },
    { height: 5.0, period: 8.0 },
    { height: 9.0, period: 8.0 },
    { height: 11.0, period: 9.0 },
    { height: 14.0, period: 10.0 },
    { height: 22.0, period: 13.0 },
  ];
  const selected = activeIndex > 0 ? options[activeIndex - 1] : undefined;

  return (
    // Top container
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top description */}
      <div className="bg-black/35 p-12 flex flex-row items-center justify-center w-full">
        <h1 className="text-left text-white text-4xl tracking-wide">
          {" "}
          Use the slider below to select a wave size.
        </h1>
      </div>

      {/* Main content container */}
      <div className="flex flex-row h-full">
        {/* Slider */}
        <div className="p-12 flex flex-1 items-center justify-center">
          <RiveComponent />
        </div>

        {/* Info & Buttons */}
        <div className="flex pr-12 flex-col justify-center items-center flex-1 gap-48">
          {/* Info */}
          <dl className="bg-black/35 rounded-3xl w-full py-12 px-8">
            <ValueRow
              label="Wave Height"
              value={selected ? String(selected.height) : "--"}
              unit="ft"
            />
            <ValueRow
              label="Wave Period"
              value={selected ? String(selected.period) : "--"}
              unit="s"
            />
          </dl>
          {/* Buttons */}
          {selected === undefined && (
            <Button
              onClick={onGoNotReady}
              text="Selecting..."
              styles="bg-[#95d5b2]/90 border-4 border-[#52b788] px-24 py-8 text-4xl rounded-full font-bold tracking-widest active:bg-[#52b788]/70 active:scale-95 active:border-4 active:border-[#52b788]"
              disabled={true}
            />
          )}
          {selected !== undefined && (
            <Link to="/wave-read-page">
              <Button
                onClick={onClick}
                text="GO"
                styles="bg-[#95d5b2]/90 border-4 border-[#52b788] px-24 py-8 text-4xl rounded-full font-bold tracking-widest active:bg-[#52b788]/70 active:scale-95 active:border-4 active:border-[#52b788]"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default WaveSelectorPage;
