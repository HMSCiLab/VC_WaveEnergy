import { spawn } from "child_process";
import fs from "fs"
import { promises as fsPromises } from "fs";
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
            try {
                if (!fs.existsSync(USER_DATA_DIR)) {
                    fs.mkdirSync(USER_DATA_DIR, {recursive: true});
                }
                await fsPromises.rename(tempFile, USER_DATA_FILE)
                console.log('main.ts >> Data transfer complete');
            } catch (err) {
                console.log("main.ts >> failed to move temp file: ", err);
            };
        }
        else {
            console.error(`main.ts >> scp failed with code -- ${code}`);
        }
    })
}

const getDriveData = async (): Promise<BuoyDataParseResult> => {
    // Make sure file exists
    if (!fs.existsSync(USER_DATA_FILE)) {
        if (!fs.existsSync(USER_DATA_DIR)) {
            fs.mkdirSync(USER_DATA_DIR, {recursive: true});
        }
        refreshData();
    }

    const raw_json = fs.readFileSync(USER_DATA_FILE, 'utf-8');
    const json = JSON.parse(raw_json);
    return normalizeData(json);
}

// Handler
export function registerPacWaveHandlers(){
    ipcMain.handle('get-drive-data', getDriveData)
}