from os import path, remove
from uvicorn import run
from interface.api import app
import signal
from pathlib import Path
import os
import json


# ENV var gets passed from electron spawn (pythonProcControls.ts)
APP_ROOT = Path(
    os.environ["WAVE_ENERGY_APP_ROOT"]
).resolve()
CONFIG_PATH = APP_ROOT / "pacwave.config.json"

with open(CONFIG_PATH) as f:
    config = json.load(f)
    SOCK_PATH = config['ipc']['uds_path']

# Interesting way to declare unknown parameters
def cleanup(*_):
    if path.exists(SOCK_PATH):
        remove(SOCK_PATH)
    raise SystemExit

signal.signal(signal.SIGTERM, cleanup)
signal.signal(signal.SIGINT, cleanup)

if __name__ == '__main__':
    run(app=app, uds=SOCK_PATH)
