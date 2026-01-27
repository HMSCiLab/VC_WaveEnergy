from processing.cdip_access import get_most_recent_row
from models.wave_props import WaveProperties
import pandas as pd


def get_data(station: str='277') -> WaveProperties:
    """
    Get the Height, Period, and Time of the most recent wave logged by CDIP. If
    the desired buoy station is non-responsive or stale, this request will cycle
    through stations 277, 278, and 280 seeking a valid response. Without valid
    data from these three, SoFar spotter data will be used as a backup.

    :param station: The desired buoy station to ping.
    :type station: str 
    """
    variables = ['waveTime', 'waveHs', 'waveTp']
    ds = get_most_recent_row(variables)
    # UTC
    waveTime = pd.Timestamp(ds['waveTime'].values[0])
    # Meters
    waveHs = ds['waveHs'].values[0]
    # Seconds
    waveTp = ds['waveTp'].values[0]
    
    return  WaveProperties(
        waveTime=waveTime,
        waveHeight=waveHs,
        wavePeriod=waveTp
    )
    

def main():
    get_data()

if __name__ == "__main__":
    main()
