import bgImage from "../assets/background-ocean.jpg";
import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { mean } from "simple-statistics";
import LoadingCircle from "../components/LoadingCircle";
import config from "../../config/arduino.config.json";
import { useNavigate } from "react-router-dom";
import { usePowerMeter } from "../page-logic/powerMeterLogic";

function WaveReadPage() {
  const navigate = useNavigate();

  // Meter management
  const { energyVal, showInfo, setShowInfo, RiveMeterComponent } =
    usePowerMeter();

  const { waveData, selectedHeight, selectedPeriod } = useAppContext();

  // WAVE INFO
  const [energyMean, setEnergyMean] = useState<number>(0);
  const [estEnergy, setEstEnergy] = useState<number>(0);
  const [doodad, setDoodad] = useState<string>("doodad");

  function genInfo() {
    const meanEnergy = mean(waveData);
    const energy: number = meanEnergy * selectedHeight;
    setEnergyMean(Math.round(meanEnergy));
    setEstEnergy(Math.round(energy));
    setDoodad(chooseDoodad(energy));
  }

  function chooseDoodad(val: number) {
    const householdObjects = {
      TV60inch: 'a 60" TV', // 150
      ledLight: "an LED Lightbulb", // 10
      dishWasher: "a dishwasher", // 1200
      toaster: "a toaster", // 800
      vacuum: "a vacuum cleaner", // 500
    };
    console.log(val);
    if (val <= 10) {
      return householdObjects.ledLight;
    } else if (val > 10 && val < 400) {
      return householdObjects.TV60inch;
    } else if (val > 400 && val < 900) {
      return householdObjects.toaster;
    } else {
      return householdObjects.dishWasher;
    }
  }

  // INFO, COUNTDOWN, LOADING ANIMATION
  useEffect(() => {
    if (!(showInfo && waveData.length > 0)) return;
    genInfo();

    const timeout = setTimeout(() => {
      navigate("/");
    }, config.time_to_read_info * 1000);

    return () => clearTimeout(timeout);
  }, [showInfo, waveData, navigate]);

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
              This wave created an average of {energyMean} Watts. If scaled to
              its true ocean size of {selectedHeight}{" "}
              {selectedHeight > 1 ? "feet" : "foot"} with a period of{" "}
              {selectedPeriod} seconds - that wave would have generated{" "}
              {estEnergy} Watts, enough to power {doodad}!
            </p>
            <p className="text-4xl text-white text-center p-6">
              What might happen if either number changed while keeping the other
              the same? Would that create more energy or less? Try making a
              different custom wave to find out!
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WaveReadPage;
