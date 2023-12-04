import requests
from dotenv import load_dotenv
import os
import pandas as pd
import json

load_dotenv()

def get_flight_info(flight_number, airlabs_api_key):
    """
    Fetch flight information from AirLabs API.
    """
    # url = "https://airlabs.co/api/v9/flight?flight_iata={flight_number}&api_key={airlabs_api_key}"

    url = f"https://airlabs.co/api/v9/flight?flight_iata={flight_number}&api_key={airlabs_api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}"

def get_weather_info(icao_code, checkwx_api_key):
    """
    Fetch weather information from CheckWX API.
    """
    url = f"https://api.checkwx.com/metar/{icao_code}/decoded"
    headers = {'X-API-Key': checkwx_api_key}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}"

#function to parse the JSON response from the CheckWX api
def extract_weather_data(weather_info):
    #Pulling relevant data from JSON
    print(weather_info['data'][0].keys())
    try:
        rain = weather_info['data'][0]['rain']['inches']
    except:
        rain = 0.00
    temp = weather_info['data'][0]['temperature']['fahrenheit']
    wind = weather_info['data'][0]['wind']['speed_mph']
    wind_direction = weather_info['data'][0]['wind']['degrees']

    snow = 0
    try:
        conditions = weather_info['data'][0]['conditions'][0]["code"]
        #METAR returns condition codes, the set contains all the relevant snowy conditions and checks if any of those are true or not
        snowy_situations = ["GS", "S", "SG", "SN", "SNINCR", "SP", "SW"]
        snow_check = set(snowy_situations)

        #if there is any snowy condition, set snow to TRUE
        for condition in conditions:
            if condition in snow_check:
                snow = 1
                break
    except:
        snow = 0




    return wind, wind_direction, rain, temp, snow

# def extract_flight_data(flight_data_json):






#function to convert data to a datafram
def convert_to_dataframe(wind, wind_direction, rain, temp, snow):

    data = {
        'Wind': wind,
        'Rain': rain,
        'Snow': snow,
        'Temperature': temp,
        'Wind_Direction': wind_direction
    }

    # 'awnd_x', 'prcp_x', 'snow_x', 'snwd_x','tavg_x', 'wdf2_x
    json_data = json.dumps(data)


    return json_data

def main():

    airlabs_api_key = "5786f070-a648-40df-9078-cd2fa6e66ee4"
    checkwx_api_key = '82c5df5581d043c9b15719eafd'

    #NEED TO PULL FLIGHT NUMBER FROM FRONTEND

    flight_number = "nk5"
    icao_code_origin = "KJFK"
    icao_code_dest = "KATL"

    flight_info = get_flight_info(flight_number, airlabs_api_key)
    weather_info = get_weather_info(icao_code_origin, checkwx_api_key)
    weather_info_dest = get_weather_info(icao_code_dest, checkwx_api_key)

    print("Flight Information:")
    print(flight_info)
    print("\nWeather Information:")
    print(weather_info)

    wind, wind_direction, rain, temp, snow = extract_weather_data(weather_info)

    json_origin = convert_to_dataframe(wind, wind_direction, rain, temp, snow)

    wind, wind_direction, rain, temp, snow = extract_weather_data(weather_info_dest)

    json_dest = convert_to_dataframe(wind, wind_direction, rain, temp, snow)

    # NEED TO FEED WEATHER INFO INTO AMISH'S MODEL


if __name__ == "__main__":
    main()
