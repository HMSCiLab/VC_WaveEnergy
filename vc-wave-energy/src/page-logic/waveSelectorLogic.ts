import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import { heightSelection, periodSelection, selected } from "../types/waveTypes";
import { useNavigate } from "react-router-dom";
import { inputValidation, convertToMM } from "./utils";

const useWaveSelector = () => {
    const nav = useNavigate();

    // Global context
    const {
        setSelectedHeight,
        setSelectedPeriod,
        activeHeightIndex,
        activePeriodIndex,
    } = useAppContext();

    // Hook specific context
    const [heightOptions, setHeightOptions] = useState<heightSelection[]>([]);
    const [periodOptions, setPeriodOptions] = useState<periodSelection[]>([]);

    // On mount, get the configured options for the sliders.
    useEffect(() => {
        const getHeightOptions = async () => {
            const heights: heightSelection[] =
                await window.ipcRenderer.invoke("get-height-options");
            setHeightOptions(heights);
        }
        const getPeriodOptions = async () => {
            const periods: periodSelection[] =
            await window.ipcRenderer.invoke("get-period-options");
            setPeriodOptions(periods);
        }
        getHeightOptions();
        getPeriodOptions();
    }, [])

    // Send wave over IPC to electron process.
    const onClickSendWave = () => {
        let waveProperties: selected | null;

        console.log(
            `Attempting to send wave of size 
            ${selectedHeight?.height}ft and period of ${selectedPeriod?.period}s`);
        
        if (selectedHeight && selectedPeriod) {
            setSelectedHeight(selectedHeight.height);
            setSelectedPeriod(selectedPeriod.period);
            waveProperties = {
                height: selectedHeight.height,
                period: selectedPeriod.period,
            };
        if (inputValidation(waveProperties)) {
            waveProperties.height = convertToMM(waveProperties)
            window.ipcRenderer.invoke("send-wave", waveProperties);
            nav("/wave-read-page");
            } 
        }
    };

    // Make sure that app cannot send blank properties.
    const onGoNotReady = () => {
        console.log("Please ensure 'Height' and 'Period' above have values.");
    };

    // Update the user specified slider values.
    const selectedHeight = useMemo(
        () => activeHeightIndex > 0 ? heightOptions[activeHeightIndex - 1] : undefined,
        [activeHeightIndex, heightOptions]
    );
    const selectedPeriod = useMemo(
        () => activePeriodIndex > 0 ? periodOptions[activePeriodIndex - 1] : undefined,
        [activePeriodIndex, periodOptions]
    );

    // Watchdog
    const readyToFire = selectedHeight && selectedPeriod;

    return {
        selectedHeight,
        selectedPeriod,
        onClickSendWave,
        onGoNotReady,
        readyToFire,
        heightOptions,
        periodOptions
    };
}

export default useWaveSelector;