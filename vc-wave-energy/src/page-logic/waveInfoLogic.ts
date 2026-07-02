import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { useAppContext } from "../AppContext";
import config from "../../config/arduino.config.json";


export const computeEnergy = (h: number, t: number) => {
    // Reduce by 85% for loss
    const instantaneousKW = (0.49 * (h ** 2) * t) * .15;
    // 1 meter width & operating for one hour
    const kilowattHours = Math.min(Math.max(instantaneousKW * 1 / 1, 2), 150);
    const animationNums = new Array();
    
    // Get ten random number +/- 40 of the instantaneous KW
    while (animationNums.length <= 10) {
      let num = ((Math.random() * 40) - 10) + instantaneousKW;

      if ((num > 2) && (num < 150)) animationNums.push(num)
    }

    return {instantaneousKW, kilowattHours, animationNums}
  }

export const useWaveInfo = (nav: NavigateFunction, showInfo: boolean) => {
  const {selectedHeight, selectedPeriod } = useAppContext();

  const [estEnergy, setEstEnergy] = useState<number>(0);
  const [doodad, setDoodad] = useState<string>("");

  const genInfo = () => {
    const { kilowattHours } = computeEnergy(selectedHeight, selectedPeriod);
    console.log(kilowattHours);
    setEstEnergy(Math.round(kilowattHours));
    setDoodad(chooseDoodad(kilowattHours));
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

    if (val <= 22) {
      return householdObjects.oneDryerCycle;
    } else if (val > 22 && val < 44) {
      return householdObjects.ac5hrs;
    } else if (val > 44 && val < 66) {
      return householdObjects.evCharge;
    } else if (val > 66 && val < 87) {
      return householdObjects.largeHome;
    } else if (val > 87 && val < 108) {
      return householdObjects.smallApartmet;
    } else if (val > 108 && val < 129) {
      return householdObjects.vacuumCleaner;
    } else if (val > 129 && val < 150) {
      return householdObjects.spaceHeater;
    } else {
      return householdObjects.averageHome;
    }
  }

  // Show info and manage the countdown
  useEffect(() => {
    if (!(showInfo)) return;
    genInfo();
    const timeout = setTimeout(() => {
      nav("/");
    }, config.time_to_read_info * 1000);

    return () => clearTimeout(timeout);
  }, [showInfo, nav]);

  return { estEnergy, doodad }
};