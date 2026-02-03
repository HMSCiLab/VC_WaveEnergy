from pydantic import BaseModel
from datetime import datetime


class WaveProperties(BaseModel):
    waveTime: datetime
    waveHeight: float
    wavePeriod: float
    stationID: int
    waveLat: float
    waveLong: float
