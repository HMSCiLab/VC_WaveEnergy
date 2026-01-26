from processing.cdip_access import get_most_recent_row


def main():
    variables = ['waveTime', 'waveHs', 'waveTp']
    ds = get_most_recent_row(variables)

    # UTC
    print("Time: ", ds['waveTime'].values[0])
    print(type(ds['waveTime'].values[0]))
    # Meters
    print("Height: ", ds['waveHs'].values[0])
    print(type(ds['waveHs'].values[0]))
    # Seconds
    print("Period: ", ds['waveTp'].values[0])
    print(type(ds['waveTp'].values[0]))

    

if __name__ == "__main__":
    main()
