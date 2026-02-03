import fs from 'node:fs'
import { CONFIG_PATH } from './paths'

export const config = JSON.parse(
    fs.readFileSync(CONFIG_PATH, 'utf-8')
);

export const SOCK_PATH = config.ipc.uds_path;
export const TRY_INTERVAL = config.healthcheck.interval_ms;
export const PIPE_MAX_TRIES = config.healthcheck.max_failures;