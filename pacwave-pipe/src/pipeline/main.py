from os import path, remove
from uvicorn import run
from interface.api import app
import signal


SOCK_PATH = '/tmp/uvicorn_pacwave_pipe.sock'

# Interesting way to declare unknown parameters
def cleanup(*_):
    # uds_sock_path = '/tmp/uvicorn_pacwave_pipe.sock'
        
    if path.exists(SOCK_PATH):
        remove(SOCK_PATH)
    raise SystemExit

signal.signal(signal.SIGTERM, cleanup)
signal.signal(signal.SIGINT, cleanup)

if __name__ == '__main__':
    
    run(app=app, uds=SOCK_PATH)
