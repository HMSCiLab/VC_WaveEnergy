import xarray as xr
from http import HTTPStatus
from datetime import datetime, UTC
import pandas as pd

def get_station_data(var: list[str], station: str='277'):
    """
    Return a subset of the OPeNDAP dataset consisting of chosen variables.
    
    :param var: Desired dataset variable to access. \n Examples: waveTime, waveHs, waveTp
    :type var: str | list[str]
    :param station: Desired station number to access at CDIP. \n Examples: 277, 278, 280
    :type station: str
    """
    station_data = 'dap2://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/realtime/' + station + 'p1_rt.nc'
    constraints = '?'
    for i, elem in enumerate(var):
        constraints = constraints + elem + ',' if i < len(var) - 1 else constraints + elem

    url = station_data + constraints
    return xr.open_dataset(filename_or_obj=url, engine='pydap')

def get_final_index(ds: xr.Dataset, var: str) -> int:
    """
    Find the top index in an Xarray dataset.
    
    :param ds: An Xarray dataset.
    :type ds: xr.Dataset
    :param var: The variable to be indexed.
    :type var: str
    """
    if type(var) == list:
        raise TypeError
    return ds[var].shape[0] - 1

def get_most_recent_row(var: list[str], station: str='277') -> xr.Dataset:
    """
    Return the most recently reported row of data from the CDIP buoy.
    
    :param var: Desired dataset variable to access. \n Examples: waveTime, waveHs, waveTp 
    :type var: str | list[str]
    :param station: Desired station number to access at CDIP. \n Examples: 277, 278, 280
    :type station: str
    """
    ds_full = get_station_data(var, station)
    last_idx = get_final_index(ds_full, var[0])
    idx_constraint = f"[{last_idx}:1:{last_idx}]"
    var_with_idx = [f"{elem}{idx_constraint}" for elem in var]
    
    return get_station_data(var_with_idx, station)


def try_waveriders(variables: list[str], stations: list[str]) -> tuple[xr.Dataset, str] | HTTPStatus:
    """
    Cycle through stations 277, 278, 280 for up-to-date data. Returns 404 on failure.
    
    :param var: Desired dataset variable to access. \n Examples: waveTime, waveHs, waveTp 
    :type var: list[str]
    """
    time_now = datetime.now(tz=UTC)
    for station in stations:
        try:
            ds = get_most_recent_row(variables, station)
            waveTime = pd.Timestamp(ds['waveTime'].values[0], tz=UTC)
            day_delta, hour_delta = time_now.day - waveTime.day, time_now.hour - waveTime.hour
            # Same day and within 6 hours of current is acceptable
            if day_delta >= 0 and hour_delta <= 6:
                return ds, station

        except KeyError as e:
            return HTTPStatus.BAD_REQUEST
    return HTTPStatus.NOT_FOUND
