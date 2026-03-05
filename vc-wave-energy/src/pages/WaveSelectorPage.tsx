import bgImage from "../assets/background-ocean.jpg";
import RiveSlider from "../components/RiveSlider";
import { useAppContext } from "../AppContext";
import useWaveSelector from "../page-logic/waveSelectorLogic";

function WaveSelectorPage() {
  const { setActiveHeightIndex, setActivePeriodIndex } = useAppContext();
  const {
    onClickSendWave,
    onGoNotReady,
    readyToFire,
  } = useWaveSelector();

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
      <div className="bg-black/35 p-12 flex items-center justify-center w-full">
        <h1 className="text-left text-white text-4xl tracking-wide">
          {" "}
          Use the sliders to select the wave's height and period.
        </h1>
      </div>

      {/* Main content container */}
      <div className="flex flex-col flex-1">


        {/* Slider */}
        <div className="flex flex-1 gap-10">
          <div className="p-12 flex flex-1 items-center justify-center">
            <RiveSlider
              rivFile="/src/assets/heightslider.riv"
              onSelectionChange={setActiveHeightIndex}
            />
          </div>

          <div className="p-12 flex flex-1 items-center justify-center">
            <RiveSlider
              rivFile="/src/assets/periodslider.riv"
              onSelectionChange={setActivePeriodIndex}
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center py-12">
          <button
            onClick={readyToFire ? onClickSendWave : onGoNotReady}
            className="bg-[#95d5b2]/90 border-4 border-[#52b788] px-24 py-8 text-4xl rounded-full font-bold tracking-widest active:bg-[#52b788]/70 active:scale-95 active:border-4 active:border-[#52b788]"
            disabled={!readyToFire}
          >
            Go
          </button>
        </div>

      </div>
    </div>
  );
}
export default WaveSelectorPage;
