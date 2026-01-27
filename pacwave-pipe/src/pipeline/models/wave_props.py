from pydantic import BaseModel
from datetime import datetime


class WaveProperties(BaseModel):
    waveTime: datetime
    waveHeight: float
    wavePeriod: float
