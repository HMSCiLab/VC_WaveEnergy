import { useEffect, useState, useRef } from "react";  
import { IpcRendererEvent } from "electron";
import {
  Alignment,
  useRive,
  Fit,
  Layout,
  useStateMachineInput,
  StateMachineInput,
} from "@rive-app/react-canvas";
import powerMeter from "../assets/power_meter.riv"
import { useAppContext } from "../AppContext";
import { computeEnergy } from "./waveInfoLogic";

export const usePowerMeter = () => {

  const { setWaveData, selectedHeight, selectedPeriod } = useAppContext();

  const targetValue = useRef(1);
  const currentValue = useRef(1);
  const rafId = useRef<number | null>(null);
  const meterMounted = useRef(true);
  const [energyVal, setEnergyVal] = useState<number>(1);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const {animationNums} = computeEnergy(selectedHeight, selectedPeriod)

  const { rive: riveMeter, RiveComponent: RiveMeterComponent } = useRive({
      src: powerMeter,
      stateMachines: "State Machine 1",
      autoplay: true,
      layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
      layoutScaleFactor: 1,
      }),
  });

  let meterEnergy: StateMachineInput | null = useStateMachineInput(
      riveMeter,
      "State Machine 1",
      "energy",
      1,
  );

  // When waves are finished
  useEffect(() => {
      if (!meterEnergy) return;

      const onWaveComplete = (_event: IpcRendererEvent, buffer: number[]) => {
          setWaveData(buffer);
          meterUpdate(0);
          setShowInfo(true);
      };

      window.ipcRenderer.on("complete-wave", onWaveComplete);
      return () => {
          window.ipcRenderer.off("complete-wave", onWaveComplete);
      };
  }, [meterEnergy]);

  // Cancel the animation if the meter is no longer mounted
  useEffect(() => {
      meterMounted.current = true;
      return () => {
          meterMounted.current = false;
          if (rafId.current) cancelAnimationFrame(rafId.current);
      };
  }, []);

  useEffect(() => {
    if (!animationNums || animationNums.length === 0) return
    if (showInfo) return

    let i = 0
    const meterIntervalId = setInterval(() => {
      if (i < animationNums.length) {
        console.log(i)
        meterUpdate(animationNums[i])
        i++
      } 
      else {
        clearInterval(meterIntervalId)
      }
    }, 500);

    return () => {
      clearInterval(meterIntervalId)
    }
  }, [animationNums])

  const moveGauge = () => {
      if (!meterEnergy) return;
      if (!meterMounted.current) return;

      const speed = 0.03; // smaller = smoother
      currentValue.current = currentValue.current + (targetValue.current - currentValue.current) * speed;

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

  return {energyVal, showInfo, setShowInfo, RiveMeterComponent}
}