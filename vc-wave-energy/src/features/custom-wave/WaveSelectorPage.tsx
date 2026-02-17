import { Link } from "react-router-dom";
import Button from "../../components/Button";
import bgImage from "../../assets/background-ocean.jpg";
import ValueRow from "../../components/ValueRow";
import { useAppContext } from "../../AppContext";
import RiveHeightSlider from "../../components/RiveSlider";

// TODOTODO ===================================================================
type heightSelection = {
  height: number;
};
type periodSelection = {
  period: number;
};
type selected = {
  height: number;
  period: number;
};
const heightOptions: [heightSelection] =
  await window.ipcRenderer.invoke("get-height-options");
const periodOptions: [periodSelection] =
  await window.ipcRenderer.invoke("get-period-options");
let waveProperties: selected | null;
// TODOTODO ===================================================================

function WaveSelectorPage() {
  // CONTEXT
  const {
    setSelectedHeight,
    setSelectedPeriod,
    activeHeightIndex,
    setActiveHeightIndex,
    activePeriodIndex,
    setActivePeriodIndex,
  } = useAppContext();

  const onClick = () => {
    console.log(
      `Sending wave of size 
      ${selectedHeight?.height}m and period of ${selectedPeriod?.period}s`,
    );
    if (selectedHeight && selectedPeriod) {
      setSelectedHeight(selectedHeight.height);
      setSelectedPeriod(selectedPeriod.period);
      waveProperties = {
        height: selectedHeight.height,
        period: selectedPeriod.period,
      };
      window.ipcRenderer.invoke("send-wave", waveProperties);
    }
  };
  const onGoNotReady = () => {
    alert("Please ensure 'Height' and 'Period' above have values.");
  };

  const selectedHeight =
    activeHeightIndex > 0 ? heightOptions[activeHeightIndex - 1] : undefined;
  const selectedPeriod =
    activePeriodIndex > 0 ? periodOptions[activePeriodIndex - 1] : undefined;

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
          {/* <RiveComponent /> */}
          <RiveHeightSlider
            rivFile="/src/assets/slider.riv"
            onSelectionChange={setActiveHeightIndex}
          />
          <RiveHeightSlider
            rivFile="/src/assets/slider.riv"
            onSelectionChange={setActivePeriodIndex}
          />
        </div>

        {/* Info & Buttons */}
        <div className="flex pr-12 flex-col justify-center items-center flex-1 gap-48">
          {/* Info */}
          <dl className="bg-black/35 rounded-3xl w-full py-12 px-8">
            <ValueRow
              label="Wave Height"
              value={selectedHeight ? String(selectedHeight.height) : "--"}
              unit="ft"
            />
            <ValueRow
              label="Wave Period"
              value={selectedPeriod ? String(selectedPeriod.period) : "--"}
              unit="s"
            />
          </dl>
          {/* Buttons */}
          {(selectedHeight === undefined || selectedPeriod === undefined) && (
            <Button
              onClick={onGoNotReady}
              text="Selecting..."
              styles="bg-[#95d5b2]/90 border-4 border-[#52b788] px-24 py-8 text-4xl rounded-full font-bold tracking-widest active:bg-[#52b788]/70 active:scale-95 active:border-4 active:border-[#52b788]"
              disabled={true}
            />
          )}
          {selectedHeight !== undefined && selectedPeriod !== undefined && (
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
