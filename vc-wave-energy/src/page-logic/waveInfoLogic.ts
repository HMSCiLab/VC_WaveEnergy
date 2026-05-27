import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { useAppContext } from "../AppContext";
import config from "../../config/arduino.config.json";

export const useWaveInfo = (nav: NavigateFunction, showInfo: boolean) => {
  const {waveData, selectedHeight, selectedPeriod } = useAppContext();

  const [estEnergy, setEstEnergy] = useState<number>(0);
  const [doodad, setDoodad] = useState<string>("doodad");

  const computeEnergy = () => {
    const instantaneousKW = (0.49 * (selectedHeight ** 2) * selectedPeriod);
    const animationNums = new Array();
    
    // Get ten random number +/- 10 of the instantaneous KW
    while (animationNums.length <= 10) {
      let num = ((Math.random() * 20) - 10) + instantaneousKW;
      if (num > 0) animationNums.push(num)
    }

    return {instantaneousKW, animationNums}
  }

  const genInfo = () => {
    const { instantaneousKW, animationNums } = computeEnergy();
    setEstEnergy(Math.round(instantaneousKW));
    setDoodad(chooseDoodad(instantaneousKW));
  }

  const chooseDoodad = (val: number) => {
    const householdObjects = {
      oneDryerCycle: "power a single cycle of a clothes dryer", // 1kwh
      ac5hrs: "power A/C for 5 hours", // 20kwh
      evCharge: "fully charge an EV", // 80kwh
      largeHome: "power a large home for 3 days", // 100kwh
      smallApartmet: "power a small apartment for a month", // 200kwh
      vacuumCleaner: "power a vacuum cleaner for 400 hours", // 400kwh
      spaceHeater: "power a space heater for 25 days", // 600kwh
      averageHome: "power an average house for a month" // 900kwh
    };

    if (val <= 20) {
      return householdObjects.oneDryerCycle;
    } else if (val > 20 && val < 80) {
      return householdObjects.ac5hrs;
    } else if (val > 80 && val < 100) {
      return householdObjects.evCharge;
    } else if (val > 100 && val < 200) {
      return householdObjects.largeHome;
    } else if (val > 200 && val < 400) {
      return householdObjects.smallApartmet;
    } else if (val > 400 && val < 600) {
      return householdObjects.vacuumCleaner;
    } else if (val > 600 && val < 900) {
      return householdObjects.spaceHeater;
    } else {
      return householdObjects.averageHome;
    }
  }

  // Show info and manage the countdown
  useEffect(() => {
    if (!(showInfo && waveData.length > 0)) return;
    genInfo();

    const timeout = setTimeout(() => {
      nav("/");
    }, config.time_to_read_info * 1000);

    return () => clearTimeout(timeout);
  }, [showInfo, waveData, nav]);

  return { estEnergy, doodad }
};