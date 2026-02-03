import {spawn, ChildProcessWithoutNullStreams} from 'node:child_process'
import { existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { APP_ROOT } from './paths';
import { SOCK_PATH } from './config';


let pyProc: ChildProcessWithoutNullStreams | null = null;
const PY_BIN = path.join(path.dirname(APP_ROOT), '.venv/bin/python')

function check_sock(){
    // defensive cleanup, delete the file if it exists
    if (existsSync(SOCK_PATH)) {
        unlinkSync(SOCK_PATH);
    }
}

function startPyPipe(){
    // Do nothing
    if (pyProc) return;

    check_sock();

    pyProc = spawn(
        PY_BIN, ['../pacwave-pipe/src/pipeline/main.py'], {
            env: {
                ...process.env,
            }
        }
    )

    pyProc.stdout.on('data', d => console.log('[python]', d.toString()));
    pyProc.stderr.on('data', d => console.error('[python]', d.toString()));

    pyProc.on('exit', (code, signal) => {
        console.warn(`Python exited (code=${code}, signal=${signal})`);
        pyProc = null;
    });
}

function killPyPipe(){
    if (!pyProc) return;

    console.warn('Killing Python process');
    pyProc.kill('SIGKILL');
    pyProc = null;

    check_sock();
}

export function restartPyPipe(){
    killPyPipe();
    startPyPipe();
}