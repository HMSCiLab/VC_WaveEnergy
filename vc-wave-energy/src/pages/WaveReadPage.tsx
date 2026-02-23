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
import { useAppContext } from "../AppContext";
import { mean } from "simple-statistics";
import LoadingCircle from "../components/LoadingCircle";
import { Link } from "react-router-dom";

function WaveReadPage() {
  const { rive: riveMeter, RiveComponent: RiveMeterComponent } = useRive({
    src: "/src/assets/power_meter.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
    }),
  });

  // WAVE GENERATION
  var meterEnergy = useStateMachineInput(
    riveMeter,
    "State Machine 1",
    "energy",
    1,
  );
  const [energyVal, setEnergyVal] = useState<number>(1);
  const targetValue = useRef(1);
  const currentValue = useRef(1);
  const rafId = useRef<number | null>(null);
  const meterMounted = useRef(true);
  const { waveData, setWaveData, selectedHeight } = useAppContext();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [energyMean, setEnergyMean] = useState<number>(0);
  const [estEnergy, setEstEnergy] = useState<number>(0);
  const [doodad, setDoodad] = useState<string>("doodad");
  const readTime: number = 30;

  const moveGauge = () => {
    if (!meterEnergy) return;
    if (!meterMounted.current) return;

    const speed = 0.03; // smaller = smoother
    currentValue.current =
      currentValue.current +
      (targetValue.current - currentValue.current) * speed;

    meterEnergy.value = currentValue.current;
    const closeEnough: number = Math.abs(
      targetValue.current - currentValue.current,
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

  function genInfo() {
    const meanEnergy = mean(waveData);
    const energy: number = meanEnergy * selectedHeight;
    setEnergyMean(meanEnergy);
    setEstEnergy(Math.round(energy));
    setDoodad(chooseDoodad(energy));
  }

  async function manageCountdown() {
    document.documentElement.style.setProperty(
      "--circle-dur",
      `${readTime.toString()}s`,
    );
    await countdown().then(() => console.log("countdown complete"));
  }

  // TODO TODO TODO****************************************************************
  async function countdown(): Promise<void> {
    for (let i = readTime; i > 1; i--) {
      if (window.location.href !== "http://localhost:5173/wave-read-page") {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 950));
    }
    if (window.location.href === "http://localhost:5173/wave-read-page") {
      window.location.href = "/";
    }
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

  // METER ANIMATION
  useEffect(() => {
    if (!meterEnergy) return;

    const onWaveVal = (_event: IpcRendererEvent, val: number) => {
      console.log(val);
      meterUpdate(val);
    };

    const onWaveComplete = (_event: IpcRendererEvent, buffer: number[]) => {
      setWaveData(buffer);
      meterUpdate(0);
      setShowInfo(true);
    };

    window.ipcRenderer.on("wave-val", onWaveVal);
    window.ipcRenderer.on("complete-wave", onWaveComplete);
    return () => {
      window.ipcRenderer.off("wave-val", onWaveVal);
      window.ipcRenderer.off("complete-wave", onWaveComplete);
    };
  }, [meterEnergy]);

  // SPECIAL CASE TO MANAGE METER
  useEffect(() => {
    meterMounted.current = true;
    return () => {
      meterMounted.current = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // INFO, COUNTDOWN, LOADING ANIMATION
  useEffect(() => {
    if (showInfo && waveData.length > 0) {
      genInfo();
      manageCountdown();
    }
  }, [showInfo]);

  useEffect(() => {
    const onErrorII = () => {
      window.location.href = "/";
    };
    window.ipcRenderer.on("ERROR-II", onErrorII);
  }, []);

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
          <Link to="/">
            <LoadingCircle />
          </Link>
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
              The wave you chose created an average of {energyMean} Watts. If
              scaled to its true ocean size of {selectedHeight} ft - that wave
              would have generated {estEnergy} Watts, enough to power {doodad}!
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WaveReadPage;
