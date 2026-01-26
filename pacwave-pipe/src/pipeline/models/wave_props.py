from pydantic import BaseModel
from numpy import datetime64, float32


class WaveProperties(BaseModel):
    waveTime: datetime64
    waveHeight: float32
    wavePeriod: float32
