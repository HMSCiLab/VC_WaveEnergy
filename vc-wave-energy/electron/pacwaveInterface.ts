import { spawn } from "child_process";
import fs from "fs"
import path from "path";

import { USER_DATA_FILE, USER_DATA_DIR } from './paths';
import { REMOTE_HOST, REMOTE_FILE } from "./config";
import { BuoyDataParseResult, normalizeData } from "./types/buoyDataType";

import { ipcMain } from "electron";


export const refreshData = () => {
    const tempFile = path.join(USER_DATA_DIR, "waverider.tmp");
    const remoteFile = [REMOTE_HOST, ":", REMOTE_FILE].join('');
    console.log(`main.ts >> cmmd = scp ${remoteFile} ${tempFile}`);
    const proc = spawn("scp", [remoteFile, tempFile]);
    
    // Error?
    proc.stderr.on("data", data => {
        console.error(data.toString());
    })

    // Success? Try to transfer
    proc.on("close", code => {
        if (code === 0){
            fs.rename(tempFile, USER_DATA_FILE, (err) => {
                if (err) throw err;
                console.log('main.ts >> Data transfer complete');
            });
        }
        else {
            console.error(`main.ts >> scp failed with code -- ${code}`);
        }
    })
}

const getDriveData = (): BuoyDataParseResult => {
    ensureFileExists(USER_DATA_FILE);

    const raw_json = fs.readFileSync(USER_DATA_FILE, 'utf-8');
    const json = JSON.parse(raw_json);

    return normalizeData(json);
}

const ensureFileExists = (filePath: string): void => {
    const dirname = path.dirname(filePath);
    console.log(`main.ts >> ensuring ${dirname} exists`);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, {recursive: true});
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}), 'utf-8');
        refreshData();
    }
} 

// Handler
export function registerPacWaveHandlers(){
    ipcMain.handle('get-drive-data', getDriveData)
}