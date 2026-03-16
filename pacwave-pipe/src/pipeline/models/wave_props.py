from pydantic import BaseModel
from datetime import datetime


class WaveProperties(BaseModel):
    timestamp: datetime
    significant_wave_height: float
    mean_period: float
    stationID: int
    latitude: float
    longitude: float
