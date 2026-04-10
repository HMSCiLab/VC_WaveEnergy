import { ipcMain } from "electron";
import { WAVERIDER_JSON } from "./paths";
import { buoyDataZ } from "./types/buoyDataType";
import {z} from 'zod';
import { PacWaveDataError } from "./errors/errors";
import fs from "fs"


const getDriveData = async () => {
    const raw_json = fs.readFileSync(WAVERIDER_JSON, 'utf-8');
    const json = JSON.parse(raw_json);

    console.log(json);
    type BuoyData = z.infer<typeof buoyDataZ>;
    const data: BuoyData = buoyDataZ.parse(json);
    
    const DAY_MS: number = 86400 * 1000;
    const HOUR_MS: number = DAY_MS / 24;
    const now: Date = new Date();
    const ts: Date = new Date(data.ts);
    

    console.log(`${now.getTime()} - ${ts.getTime()} = ${now.getTime() - ts.getTime()}`);
    if (now.getDay() - ts.getDay() >  DAY_MS) throw new PacWaveDataError(`PacWave data more than a day old.`);
    if (now.getTime() - ts.getTime() >  (HOUR_MS * 6)) throw new PacWaveDataError(`PacWave data more than 6 hours old.`);

    return data;
}

// Handler
export function registerPacWaveHandlers(){
    ipcMain.handle('get-drive-data', getDriveData)
}