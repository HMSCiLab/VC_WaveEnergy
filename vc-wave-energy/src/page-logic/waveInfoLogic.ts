import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { useAppContext } from "../AppContext";
import config from "../../config/arduino.config.json";

type doodadInfo = {
  doodadPrefix: string,
  doodadObject: string,
  doodadNum: number,
}

export const computeEnergy = (h: number, t: number) => {
    // Reduce by 85% for loss
    const instantaneousKW = (0.49 * (h ** 2) * t) * .15;
    // 1 meter width & operating for one hour
    const kilowattHours = Math.min(Math.max(instantaneousKW * 1 / 1, 2), 150);
    const animationNums = new Array();
    
    // Get ten random number +/- 40 of the instantaneous KW
    while (animationNums.length <= 10) {
      let num = ((Math.random() * 40) - 20) + instantaneousKW;

      if ((num > 2) && (num < 150)) animationNums.push(num)
    }

    return {instantaneousKW, kilowattHours, animationNums}
  }

export const useWaveInfo = (nav: NavigateFunction, showInfo: boolean) => {
  const {selectedHeight, selectedPeriod } = useAppContext();

  const [estEnergy, setEstEnergy] = useState<number>(0);
  const [doodadName, setDoodadName] = useState<string>("");
  const [doodadPrefix, setDoodadPrefix] = useState<string>("");
  const [doodadNumber, setDoodadNumber] = useState<number>(0);

  const genInfo = () => {
    const { kilowattHours } = computeEnergy(selectedHeight, selectedPeriod);
    setEstEnergy(Math.round(kilowattHours));
    const doodadInfo = chooseDoodad(kilowattHours);
    setDoodadName(doodadInfo.doodadObject);
    setDoodadPrefix(doodadInfo.doodadPrefix);
    setDoodadNumber(doodadInfo.doodadNum);
  }

  const chooseDoodad = (val: number): doodadInfo => {
    let doodadPrefix = ""
    let doodadObject = ""
    let doodadNum = 0

    const prefix = {
      cellphones: "power to charge",
      dishwasher: "to complete",
      dryer: "to complete",
      refrigerator: "to power a refrigerator for",
      ac: "to power",
      house: "to power the average house for"
    }

    const object = {
      cellphones: "cellphones",
      dishwasher: "loads in a dishwasher",
      dryer: "cycles of a clothes dryer",
      refrigerator: "days",
      ac: "hours of air conditioning",
      house: "days"
    };

    const numKW = {
      cellphones: 40,
      dishwasher: 9,
      dryer: 45,
      refrigerator: 8,
      ac: 27,
      house: 4
    }

    if (val <= 15) {
      doodadPrefix = prefix.cellphones
      doodadObject = object.cellphones
      doodadNum = numKW.cellphones
    } else if (val > 15 && val <= 30) {
      doodadPrefix = prefix.dishwasher
      doodadObject = object.dishwasher
      doodadNum = numKW.dishwasher      
    } else if (val > 30 && val <= 60) {
      doodadPrefix = prefix.dryer
      doodadObject = object.dryer
      doodadNum = numKW.dryer
    } else if (val > 60 && val <= 90) {
      doodadPrefix = prefix.refrigerator
      doodadObject = object.refrigerator
      doodadNum = numKW.refrigerator
    } else if (val > 90 && val <= 120) {
      doodadPrefix = prefix.ac
      doodadObject = object.ac
      doodadNum = numKW.ac
    } else if (val > 120 && val <= 150) {
      doodadPrefix = prefix.house
      doodadObject = object.house
      doodadNum = numKW.house
    } else {
      doodadPrefix = prefix.dishwasher
      doodadObject = object.dishwasher
      doodadNum = numKW.dishwasher
    }

    return {doodadPrefix, doodadObject, doodadNum}
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

  return { estEnergy, doodadName, doodadPrefix, doodadNumber}
};