from processing.cdip_access import try_waveriders
from models.wave_props import WaveProperties
from pydantic import ValidationError
import pandas as pd
import xarray as xr
from typing import Any
from fastapi import FastAPI, HTTPException


app = FastAPI()

@app.get("/status")
async def status() -> dict:
    return {"Status": "OK"}

@app.get("/data/cdip", response_model=WaveProperties, status_code=200)
async def get_cdip_data() -> Any:
    """
    Get the Height, Period, and Time of the most recent wave logged by CDIP. If
    the desired buoy station is non-responsive or stale, this request will cycle
    through stations 277, 278, and 280 seeking a valid response. Without valid
    data from these three, SoFar spotter data will be used as a backup.

    :param station: The desired buoy station to ping.
    :type station: str 
    """
    variables = [
        'waveTime', 
        'waveHs', 
        'waveTa', 
        'gpsLatitude', 
        'gpsLongitude'
    ]
    stations = ['277', '278', '280']
    resp = try_waveriders(variables, stations)

    if type(resp) == tuple:
        ds, station = resp
        # UTC
        waveTime = pd.Timestamp(ds['waveTime'].values[0])
        # Meters -> Feet
        waveHs = ds['waveHs'].values[0] * 3.28084
        # Seconds
        waveTa = ds['waveTa'].values[0]
        waveLat = ds['gpsLatitude'].values[0]
        waveLong = ds['gpsLongitude'].values[0]
        
        try: 
            data = WaveProperties(
                waveTime=waveTime,
                waveHeight=waveHs,
                wavePeriod=waveTa,
                waveLat=waveLat,
                waveLong=waveLong,
                stationID=int(station)
            )

            return data
        except ValidationError as e:
            raise HTTPException(400, "Corrupt data")
    
    
    raise HTTPException(404, "Stale waverider data, try SoFar")
