import { request, setGlobalDispatcher, Agent } from 'undici';
import { ipcMain } from "electron";


const SOCK_PATH = '/tmp/uvicorn_pacwave_pipe.sock'

// Set up a global agent that uses the Unix Domain Socket
setGlobalDispatcher(new Agent({
    socketPath: SOCK_PATH
}));

export async function getPipeStatus () {
    const { body } = await request('http://localhost/data/cdip');
    const data = await body.json();
    console.log(data);
}