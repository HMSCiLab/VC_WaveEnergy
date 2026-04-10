import bgImage from "../assets/background-ocean.jpg";
import RiveSlider from "../components/RiveSlider";
import { useAppContext } from "../AppContext";
import useWaveSelector from "../page-logic/waveSelectorLogic";
import { Link } from "react-router-dom";

function WaveSelectorPage() {
  const { setActiveHeightIndex, setActivePeriodIndex } = useAppContext();
  const { onClickSendWave, onGoNotReady, readyToFire } = useWaveSelector();

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
      <div className="bg-black/35 flex py-10 items-center justify-center w-full">
        <h1 className="text-left text-white text-4xl tracking-wide">
          Use the sliders to select the wave's height and period.
        </h1>
      </div>

      {/* Main content container */}
      <div className="flex flex-col flex-1">
        {/* Slider */}
        <div className="flex flex-1 gap-8 items-center justify-center">
          <div className="flex flex-1 h-full">
            <RiveSlider
              rivFile="/src/assets/heightslider.riv"
              onSelectionChange={setActiveHeightIndex}
            />
          </div>

          <div className="flex flex-1 h-full pe-6">
            <RiveSlider
              rivFile="/src/assets/periodslider.riv"
              onSelectionChange={setActivePeriodIndex}
            />
          </div>
        </div>

        {/* Go Button */}
        <div className="flex flex-row justify-center items-center gap-10">
          <button
            onClick={readyToFire ? onClickSendWave : onGoNotReady}
            className="bg-[#95d5b2]/90 border-4 border-[#52b788]
            flex items-center justify-center
            px-16 py-8 text-4xl rounded-full font-bold tracking-widest 
            active:bg-[#52b788]/70 active:scale-95 active:border-4 active:border-[#52b788]"
            disabled={!readyToFire}
          >
            {/* First span sets width */}
            <span className="invisible">Select a wave</span>
            <span className="absolute">
              {readyToFire ? "Go" : "Select a wave"}
            </span>
          </button>

          <div className="flex flex-col justify-center items-center py-12 gap-5">
            <Link
              to={"/"}
              className="bg-[#8f261e]/90 border-4 border-[#731b15]
                        flex items-center justify-center
                        px-16 py-4 text-2xl rounded-full font-bold tracking-widest 
                        active:bg-[#8f261e]/70 active:scale-95 active:border-4 active:border-[#731b15]"
            >
              <span className="invisible">Learn more</span>
              <span className="absolute">Cancel</span>
            </Link>
            <Link
              to="/learn-page"
              className="flex items-center justify-center 
                        font-bold tracking-widest text-2xl
                        bg-white/50 border-4 border-white/30 rounded-full 
                        px-16 py-4"
            >
              <span className="flex">Learn more</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WaveSelectorPage;
