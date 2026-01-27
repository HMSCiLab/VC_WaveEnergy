from processing.cdip_access import get_most_recent_row
from models.wave_props import WaveProperties
import pandas as pd
from fastapi import FastAPI


app = FastAPI()

@app.get("/")
async def status() -> dict:
    return {"Status": "OK"}

@app.get("/data/cdip")
async def get_cdip_data(station: str='277') -> str:
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
    # Meters -> Feet
    waveHs = ds['waveHs'].values[0] * 3.28084
    # Seconds
    waveTp = ds['waveTp'].values[0]
    
    data = WaveProperties(
        waveTime=waveTime,
        waveHeight=waveHs,
        wavePeriod=waveTp
    )

    return data.model_dump_json(indent=2)