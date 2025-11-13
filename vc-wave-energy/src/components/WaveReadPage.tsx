import {
  Alignment,
  useRive,
  Fit,
  Layout,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import bgImage from "../assets/background-ocean.jpg";
import { useState } from "react";

function WaveReadPage() {
  const { rive, RiveComponent } = useRive({
    src: "/src/assets/power_meter.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
    }),
  });

  var meterEnergy = useStateMachineInput(rive, "State Machine 1", "energy", 1);
  const [energyVal, setEnergyVal] = useState<number>(1);

  const changeEnergy = () => {
    if (meterEnergy && typeof meterEnergy.value == "number") {
      if (meterEnergy.value < 100) {
        meterEnergy.value += 5;
      } else {
        meterEnergy.value = 1;
      }
      setEnergyVal(meterEnergy.value);
    }
  };

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
      {/* Meter animation */}
      <div className="flex flex-2 flex-col gap-0 justify-center items-center">
        <RiveComponent />
        {energyVal > 0 && (
          <div className="pb-36 text-9xl text-white">
            {energyVal} watts
            </div>
        )}
      </div>
      {/* Info box */}
      <div className="bg-black/35 flex flex-1 flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl text-white">Generating electricity...</h1>
        <button onClick={changeEnergy} className="bg-amber-100 border-2 p-12">
          Change energy
        </button>
      </div>
    </div>
  );
}

export default WaveReadPage;
