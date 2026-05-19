import {z} from 'zod';
import { spawn } from "child_process";
import fs from "fs"
import path from "path";

import { USER_DATA_FILE, USER_DATA_DIR } from './paths';
import { REMOTE_HOST, REMOTE_FILE } from "./config";
import { buoyDataZ } from "./types/buoyDataType";
import { PacWaveDataError } from "./errors/errors";

import { ipcMain } from "electron";


export const refreshData = async () => {
    const tempFile = path.join(USER_DATA_DIR, "waverider.tmp");
    const remoteFile = [REMOTE_HOST, ":", REMOTE_FILE].join('');

    const proc = spawn("scp", [remoteFile, tempFile]);
    
    // Getting data?
    proc.stdout.on("data", data => {
        console.log(data.toString());
    })
    // Got an error?
    proc.stderr.on("data", data => {
        console.error(data.toString());
    })
    // Success? Try to transfer
    proc.on("close", async code => {
        if (code === 0){
            await fs.rename(tempFile, USER_DATA_FILE, (err) => {
                if (err) throw err;
                console.log('main.ts >> Data transfer complete');
            });
        }
        else {
            console.error(`main.ts >> scp failed with code -- ${code}`);
        }
    })
}

const getDriveData = async () => {
    const raw_json = fs.readFileSync(USER_DATA_FILE, 'utf-8');
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