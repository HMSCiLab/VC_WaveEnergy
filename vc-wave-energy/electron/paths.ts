import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ELECTRON_DIST = __dirname;
export const APP_ROOT = path.join(__dirname, '..');
export const CONFIG_PATH = path.join(APP_ROOT, 'pacwave.config.json');