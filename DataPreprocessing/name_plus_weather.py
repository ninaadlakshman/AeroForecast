import pandas as pd
import tqdm

name_to_name = pd.read_csv("csv_files/sorted_name_to_name.csv")
airports_weather = pd.read_csv("csv_files/airports_weather.csv")

merged_data = pd.merge(
    airports_weather,
    name_to_name,
    left_on='name',
    right_on='weather_name',
    how='left'
)

def keep_first_match(group):
    return group.iloc[0]

merged_data = merged_data.groupby(merged_data.index).apply(keep_first_match)

merged_data.to_csv('weather_stuff.csv', index=False)

