import pandas as pd
import tqdm

weather_data = pd.read_csv("csv_files/weather_stuff.csv")
flight_info = pd.read_csv("csv_files/FlightInformation.csv")

print(flight_info.columns)


origin_weather_combined = pd.merge(flight_info, weather_data, left_on=['flight_date', 'origin_airport'], right_on=['date', 'code'], how='left')
combined = pd.merge(origin_weather_combined, weather_data, left_on=['flight_date', 'destination_airport'], right_on=['date', 'code'], how='left')

combined.to_csv('final_data.csv', index=False)