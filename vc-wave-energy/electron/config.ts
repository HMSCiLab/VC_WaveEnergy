import fs from 'node:fs'
import { PACWAVE_CONFIG, ARDUINO_CONFIG } from './paths'

// PACWAVE CONFIGURATIONS
const pacwave_config = JSON.parse(
    fs.readFileSync(PACWAVE_CONFIG, 'utf-8')
);
export const SOCK_PATH = pacwave_config.ipc.uds_path;
export const TRY_INTERVAL = pacwave_config.healthcheck.interval_ms;
export const PIPE_MAX_TRIES = pacwave_config.healthcheck.max_failures;

// ARDUINO CONFIGURATIONS
const arduino_config = JSON.parse(
    fs.readFileSync(ARDUINO_CONFIG, 'utf-8')
);
export const FEATHER_VENDOR_ID = arduino_config.ports.featherM0_vendor_id;
export const FEATHER_PRODUCT_ID = arduino_config.ports.featherM0_product_id;
export const BAUD_RATE = arduino_config.baud_rate