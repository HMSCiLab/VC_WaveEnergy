import {
  Alignment,
  useRive,
  Fit,
  Layout,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import bgImage from "../assets/background-ocean.jpg";
import { useEffect, useState, useRef } from "react";
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
  const targetValue = useRef(1);
  const currentValue = useRef(1);
  const rafId = useRef<number | null>(null);

  const moveGauge = () => {
    if (!meterEnergy) return;

    const speed = 0.03; // smaller = smoother
    currentValue.current =
      currentValue.current +
      (targetValue.current - currentValue.current) * speed;

    meterEnergy.value = currentValue.current;
    const closeEnough: number = Math.abs(
      targetValue.current - currentValue.current
    );
    setEnergyVal(Math.floor(currentValue.current));

    // Stop when close enough
    if (closeEnough > 0.01) {
      rafId.current = requestAnimationFrame(moveGauge);
    }
  };

  function meterUpdate(val: number) {
    targetValue.current = val;
    // cancel previous frame
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(moveGauge);
  }

  useEffect(() => {
    const onWaveVal = (_event: IpcRendererEvent, val: number) => {
      console.log("Value received: ", val);
      meterUpdate(val);
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
