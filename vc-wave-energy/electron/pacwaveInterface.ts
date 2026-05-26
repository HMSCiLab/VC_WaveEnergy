import { spawn } from "child_process";
import fs from "fs"
import path from "path";

import { USER_DATA_FILE, USER_DATA_DIR } from './paths';
import { REMOTE_HOST, REMOTE_FILE } from "./config";
import { BuoyDataParseResult, normalizeData } from "./types/buoyDataType";

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

const getDriveData = async (): Promise<BuoyDataParseResult> => {
    const raw_json = fs.readFileSync(USER_DATA_FILE, 'utf-8');
    const json = JSON.parse(raw_json);
    return normalizeData(json);
}

// Handler
export function registerPacWaveHandlers(){
    ipcMain.handle('get-drive-data', getDriveData)
}