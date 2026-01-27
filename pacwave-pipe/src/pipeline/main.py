from interface.api import PacWavePipeAPI
from zerorpc import Server
import gevent, signal
 

def main():
    port = 1234
    addr = f'tcp://127.0.0.1:{port}'
    s = Server(PacWavePipeAPI())
    s.bind(addr)

    gevent.signal_handler(signal.SIGTERM, s.stop)
    gevent.signal_handler(signal.SIGINT, s.stop)  # ^C
    print("Starting Process\n", "-"*20)
    s.run()


if __name__ == "__main__":
    main()
