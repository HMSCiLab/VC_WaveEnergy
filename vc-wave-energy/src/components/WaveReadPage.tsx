import {
  Alignment,
  useRive,
  Fit,
  Layout,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import bgImage from "../assets/background-ocean.jpg";
import { useEffect, useState } from "react";
import { IpcRendererEvent } from "electron";

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

  useEffect(() => {
    const onWaveVal = (_event: IpcRendererEvent, val: number) => {
      console.log("Value received: ", val);
      setEnergyVal(val);
      if (meterEnergy && typeof meterEnergy.value === "number") {
        meterEnergy.value = val;
      }
    };
    window.ipcRenderer.on("wave-val", onWaveVal);
    return () => {
      window.ipcRenderer.off("wave-val", onWaveVal);
    };
  }, [meterEnergy]);

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
        {energyVal >= 0 && (
          <div className="pb-36 text-9xl text-white">{energyVal} watts</div>
        )}
      </div>
      {/* Info box */}
      <div className="bg-black/35 flex flex-1 flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl text-white">Generating electricity...</h1>
      </div>
    </div>
  );
}

export default WaveReadPage;
