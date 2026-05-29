import bgImage from "../assets/background-ocean.jpg";
import { useAppContext } from "../AppContext";
import LoadingCircle from "../components/LoadingCircle";
import { useNavigate } from "react-router-dom";
import { usePowerMeter } from "../page-logic/powerMeterLogic";
import { useWaveInfo } from "../page-logic/waveInfoLogic";

function WaveReadPage() {
  const navigate = useNavigate();
  const { selectedHeight, selectedPeriod } = useAppContext();

  // Meter management
  const { energyVal, showInfo, setShowInfo, RiveMeterComponent } =
    usePowerMeter();

  // Wave info
  const { estEnergy, doodad } = useWaveInfo(navigate, showInfo);

  return (
    // Main Container
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showInfo && (
        <div className="absolute top-4 right-4 inset-0 z-50">
          <button
            onClick={() => {
              navigate("/");
              setShowInfo(false);
            }}
          >
            <LoadingCircle />
          </button>
        </div>
      )}
      {/* Meter animation */}
      <div className="flex flex-2 flex-col gap-0 justify-center items-center relative">
        <RiveMeterComponent />
        {energyVal >= 0 && (
          <div className="pb-36 text-9xl text-white">{energyVal} watts</div>
        )}
      </div>
      {/* Info box */}
      <div className="bg-black/35 flex flex-1 flex-col gap-8 justify-center items-center">
        {/* Generating waves */}
        {!showInfo && (
          <h1 className="text-4xl text-white">Generating electricity...</h1>
        )}
        {/* Finished generating waves */}
        {showInfo && (
          <>
            <p className="text-4xl text-white text-center p-6">
              If scaled to its true ocean size of {selectedHeight}{" "}
              {selectedHeight > 1 ? "feet" : "foot"} with a period of{" "}
              {selectedPeriod} seconds, that set of waves would have generated{" "}
              {estEnergy} kilowatt-hours. That's enough to {doodad}!
            </p>
            <p className="text-4xl text-white text-center p-6">
              What might happen if either the height or period changed? Would
              that create more energy or less? Try making a different custom
              wave to find out!
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WaveReadPage;
