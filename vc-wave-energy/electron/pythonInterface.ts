import { request, setGlobalDispatcher, Agent } from 'undici';
import { restartPyPipe } from './pythonProcControl';
import { SOCK_PATH, PIPE_MAX_TRIES, TRY_INTERVAL } from './config';

let failures = 0;

// Set up a global agent that uses the Unix Domain Socket
setGlobalDispatcher(new Agent({
    socketPath: SOCK_PATH
}));

export async function initPacWavePipe () {
    setInterval(tryStatus, TRY_INTERVAL);
}

async function tryStatus () {
    try {
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
        console.warn(`Health check failed (${failures})`);

        if (failures >= PIPE_MAX_TRIES) {
            console.error('Python appears hung — restarting');
            failures = 0;
            restartPyPipe();
        }
    }
}