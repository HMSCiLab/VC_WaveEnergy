from os import path, remove
from uvicorn import run
from interface.api import app

if __name__ == '__main__':
    uds_sock_path = '/tmp/uvicorn_pacwave_pipe.sock'

    if path.exists(uds_sock_path):
        remove(uds_sock_path)
    
    run(app=app, uds=uds_sock_path)
