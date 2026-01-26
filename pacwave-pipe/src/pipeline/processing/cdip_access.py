import xarray as xr


def get_station_data(var: str | list[str], station: str='277'):
    """
    Return a subset of the OPeNDAP dataset consisting of chosen variables.
    
    :param var: Desired dataset variable to access. \n Examples: waveTime, waveHs, waveTp
    :type var: str | list[str]
    :param station: Desired station number to access at CDIP. \n Examples: 277, 278, 280
    :type station: str
    """
    station_data = 'dap2://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/realtime/' + station + 'p1_rt.nc'
    if type(var) == list:
        constraints = '?'
        for i, elem in enumerate(var):
            constraints = constraints + elem + ',' if i < len(var) - 1 else constraints + elem
    else:
        constraints = f"?{var}"
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

def get_most_recent_row(var: str | list[str], station: str='277') -> xr.Dataset:
    """
    Return the most recently reported row of data from the CDIP buoy.
    
    :param var: Desired dataset variable to access. \n Examples: waveTime, waveHs, waveTp 
    :type var: str | list[str]
    :param station: Desired station number to access at CDIP. \n Examples: 277, 278, 280
    :type station: str
    """
    ds_full = get_station_data(var, station)
    last_idx = get_final_index(ds_full, var[0]) if type(var) == list else var
    idx_constraint = f"[{last_idx}:1:{last_idx}]"
    if type(var) == list:
        var_with_idx = [f"{elem}{idx_constraint}" for elem in var]
    else:
        var_with_idx = f"{var}{idx_constraint}"
    
    return get_station_data(var_with_idx, station)
