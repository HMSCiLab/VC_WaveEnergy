import { request, setGlobalDispatcher, Agent } from 'undici';
import { restartPyPipe } from './pythonProcControl';
import { SOCK_PATH, PIPE_MAX_TRIES, TRY_INTERVAL } from './config';
import { ipcMain } from 'electron';

let failures = 0;

// Set up a global agent that uses the Unix Domain Socket
setGlobalDispatcher(new Agent({
    socketPath: SOCK_PATH
}));

export async function initPacWavePipe(){
    restartPyPipe();
}

// Runs for lifetime of application
export async function CheckPacWavePipe () {
    setInterval(tryStatus, TRY_INTERVAL);
}

async function tryStatus () {
    try  {
        // Try to access pipeline
        const { statusCode, body } = await request('http://localhost/status', {
            headersTimeout: 1000,
            bodyTimeout: 1000
        });
        if (statusCode != 200){
            throw new Error(`Bad status: ${statusCode}`);
        }
        // Success, fulfill promise
        await body.json();
        failures = 0;
    } 
    catch (error) {
        // Catch the bad status and increment failures. Restart pipe if exceed tries
        failures++;
        console.warn(`PyPipe start failures: (${failures}/${PIPE_MAX_TRIES})`);

        if (failures >= PIPE_MAX_TRIES) {
            console.error('Python appears hung — restarting');
            failures = 0;
            restartPyPipe();
        }
    }
}

async function getCdipData() {
    try {
        // Try to access pipeline
        const { statusCode, body } = await request('http://localhost/data/cdip', {
            headersTimeout: 10000,
            bodyTimeout: 10000
        });
        if (statusCode != 200){
            throw new Error(`Bad status: ${statusCode}`);
        }
        // Success, fulfill promise
        const data = await body.json(); 
        return data
    } 
    catch (err) {
        console.error('CDIP fetch failed:', err);
        throw err; // propagate to renderer
    }
}

// HANDLERS
export function registerPyPipeHandlers(){
    ipcMain.handle('get-wave-data', getCdipData)
}