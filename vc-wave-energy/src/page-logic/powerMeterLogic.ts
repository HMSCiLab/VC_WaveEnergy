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

export const usePowerMeter = () => {

    const { setWaveData } = useAppContext();

    const targetValue = useRef(1);
    const currentValue = useRef(1);
    const rafId = useRef<number | null>(null);
    const meterMounted = useRef(true);
    const [energyVal, setEnergyVal] = useState<number>(1);
    const [showInfo, setShowInfo] = useState<boolean>(false);

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

    useEffect(() => {
        meterMounted.current = true;
        return () => {
            meterMounted.current = false;
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

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

    return {energyVal, showInfo, setShowInfo, RiveMeterComponent}
}