import requests
from dotenv import load_dotenv
import os
import pandas as pd


load_dotenv()

def get_flight_info(flight_number, airlabs_api_key):
    """
    Fetch flight information from AirLabs API.
    """
    url = f"https://airlabs.co/api/v9/flights?api_key={airlabs_api_key}&flight_iata={flight_number}"
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

#function to parse the JSON response
def get_model_input(weather_info):
    #Pulling relevant data from JSON
    rain = weather_info.data.rain.inches
    temp = weather_info.data.temperature.fahrenheit
    wind = weather_info.data.wind.speed_mph
    wind_direction = weather_info.data.wind.degrees

    snow = 0

    conditions = weather_info.data.conditions
    

    #METAR returns condition codes, the set contains all the relevant snowy conditions and checks if any of those are true or not
    snowy_situations = ["GS", "S", "SG", "SN", "SNINCR", "SP", "SW"]
    snow_check = set(snowy_situations)

    #if there is any snowy condition, set snow to TRUE
    for condition in conditions:
        if condition.code in snow_check:
            snow = 1
            break

    return wind, wind_direction, rain, temp, snow


#function to convert data to a datafram
def convert_to_dataframe(wind, wind_direction, rain, temp, snow):
    
    data = {
        'Wind': wind,
        'Wind Direction': wind_direction,
        'Rain': rain,
        'Temperature': temp,
        'Snow': snow
    }

    
    df = pd.DataFrame(data)

    return df


    


def main():
    
    airlabs_api_key = os.environ.get('AIRLABS_API_KEY')
    checkwx_api_key = os.environ.get('CHECKWX_API_KEY')

    #NEED TO PULL FLIGHT NUMBER FROM FRONTEND

    flight_number = "NK968"  
    icao_code = "KJFK"       

    flight_info = get_flight_info(flight_number, airlabs_api_key)
    weather_info = get_weather_info(icao_code, checkwx_api_key)

    wind, wind_direction, rain, temp, snow = get_model_input(weather_info)

    df = convert_to_dataframe(wind, wind_direction, rain, temp, snow)

    
    # NEED TO FEED WEATHER INFO INTO AMISH'S MODEL
    print("Flight Information:")
    print(flight_info)
    print("\nWeather Information:")
    print(weather_info)

if __name__ == "__main__":
    main()
