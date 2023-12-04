import requests
from dotenv import load_dotenv
import os
import pandas as pd
import json
from datetime import datetime
import joblib
from flask import Flask, request, jsonify
app = Flask(__name__)

load_dotenv()

rf_delay_classifier = joblib.load('rf_delay_binary_model.pkl')
rf_delay_bucket = joblib.load('rf_delay_bucket_model.pkl')

encoder = {'9E': 0, 'AA': 1, 'AS': 2, 'B6': 3, 'DL': 4, 'F9': 5, 'G4': 6, 'HA': 7, 'MQ': 8, 'NK': 9, 'OH': 10, 'OO': 11, 'QX': 12, 'UA': 13, 'WN': 14, 'YV': 15, 'YX': 16}

encoder_origin = {'ABE': 0, 'ABI': 1, 'ABQ': 2, 'ABR': 3, 'ABY': 4, 'ACK': 5, 'ACT': 6, 'ACV': 7, 'ACY': 8, 'ADQ': 9, 'AEX': 10, 'AGS': 11, 'AKN': 12, 'ALB': 13, 'AMA': 14, 'ANC': 15, 'APN': 16, 'ASE': 17, 'ATL': 18, 'ATW': 19, 'AUS': 20, 'AVL': 21, 'AVP': 22, 'AZA': 23, 'AZO': 24, 'BDL': 25, 'BET': 26, 'BGR': 27, 'BHM': 28, 'BIH': 29, 'BIL': 30, 'BIS': 31, 'BJI': 32, 'BLI': 33, 'BLV': 34, 'BMI': 35, 'BNA': 36, 'BOI': 37, 'BOS': 38, 'BQK': 39, 'BRD': 40, 'BRO': 41, 'BTM': 42, 'BTR': 43, 'BTV': 44, 'BUF': 45, 'BUR': 46, 'BWI': 47, 'BZN': 48, 'CAE': 49, 'CAK': 50, 'CDV': 51, 'CHA': 52, 'CHO': 53, 'CHS': 54, 'CID': 55, 'CKB': 56, 'CLE': 57, 'CLT': 58, 'CMH': 59, 'CMI': 60, 'CMX': 61, 'CNY': 62, 'COS': 63, 'COU': 64, 'CRP': 65, 'CRW': 66, 'CSG': 67, 'CVG': 68, 'CWA': 69, 'DAB': 70, 'DAL': 71, 'DAY': 72, 'DBQ': 73, 'DCA': 74, 'DDC': 75, 'DEC': 76, 'DEN': 77, 'DFW': 78, 'DHN': 79, 'DLH': 80, 'DRO': 81, 'DSM': 82, 'DTW': 83, 'DVL': 84, 'EAR': 85, 'ECP': 86, 'EGE': 87, 'EKO': 88, 'ELM': 89, 'ELP': 90, 'EUG': 91, 'EVV': 92, 'EWR': 93, 'EYW': 94, 'FAI': 95, 'FAR': 96, 'FAT': 97, 'FAY': 98, 'FCA': 99, 'FLG': 100, 'FLL': 101, 'FNT': 102, 'FOD': 103, 'FSD': 104, 'FSM': 105, 'FWA': 106, 'GCK': 107, 'GEG': 108, 'GFK': 109, 'GGG': 110, 'GJT': 111, 'GNV': 112, 'GPT': 113, 'GRB': 114, 'GRI': 115, 'GRK': 116, 'GRR': 117, 'GSO': 118, 'GSP': 119, 'GTF': 120, 'GTR': 121, 'GUM': 122, 'HDN': 123, 'HHH': 124, 'HIB': 125, 'HLN': 126, 'HNL': 127, 'HOU': 128, 'HPN': 129, 'HRL': 130, 'HSV': 131, 'HYS': 132, 'IAD': 133, 'IAH': 134, 'ICT': 135, 'IDA': 136, 'ILM': 137, 'IMT': 138, 'IND': 139, 'INL': 140, 'ISP': 141, 'ITH': 142, 'ITO': 143, 'JAC': 144, 'JAN': 145, 'JAX': 146, 'JFK': 147, 'JLN': 148, 'JMS': 149, 'JNU': 150, 'JST': 151, 'KOA': 152, 'KTN': 153, 'LAN': 154, 'LAR': 155, 'LAS': 156, 'LAX': 157, 'LBB': 158, 'LBE': 159, 'LBF': 160, 'LBL': 161, 'LCH': 162, 'LCK': 163, 'LEX': 164, 'LFT': 165, 'LGA': 166, 'LGB': 167, 'LIH': 168, 'LIT': 169, 'LRD': 170, 'LSE': 171, 'MAF': 172, 'MBS': 173, 'MCI': 174, 'MCO': 175, 'MCW': 176, 'MDT': 177, 'MDW': 178, 'MEM': 179, 'MFE': 180, 'MFR': 181, 'MGM': 182, 'MHK': 183, 'MHT': 184, 'MIA': 185, 'MKE': 186, 'MKG': 187, 'MLB': 188, 'MLI': 189, 'MLU': 190, 'MOB': 191, 'MOT': 192, 'MRY': 193, 'MSN': 194, 'MSO': 195, 'MSP': 196, 'MSY': 197, 'MTJ': 198, 'MVY': 199, 'MYR': 200, 'OAK': 201, 'OGG': 202, 'OKC': 203, 'OMA': 204, 'OME': 205, 'ONT': 206, 'ORD': 207, 'ORF': 208, 'ORH': 209, 'PAE': 210, 'PBG': 211, 'PBI': 212, 'PDX': 213, 'PGD': 214, 'PHL': 215, 'PHX': 216, 'PIA': 217, 'PIB': 218, 'PIE': 219, 'PIH': 220, 'PIT': 221, 'PLN': 222, 'PNS': 223, 'PRC': 224, 'PSC': 225, 'PSE': 226, 'PSM': 227, 'PSP': 228, 'PVD': 229, 'PVU': 230, 'PWM': 231, 'RAP': 232, 'RDD': 233, 'RDM': 234, 'RDU': 235, 'RFD': 236, 'RHI': 237, 'RIC': 238, 'RIW': 239, 'RKS': 240, 'RNO': 241, 'ROA': 242, 'ROC': 243, 'ROW': 244, 'RST': 245, 'RSW': 246, 'SAF': 247, 'SAN': 248, 'SAT': 249, 'SAV': 250, 'SBA': 251, 'SBN': 252, 'SBP': 253, 'SCK': 254, 'SDF': 255, 'SEA': 256, 'SFB': 257, 'SFO': 258, 'SGF': 259, 'SGU': 260, 'SHR': 261, 'SHV': 262, 'SIT': 263, 'SJC': 264, 'SJT': 265, 'SJU': 266, 'SLC': 267, 'SLN': 268, 'SMF': 269, 'SNA': 270, 'SPI': 271, 'SPS': 272, 'SRQ': 273, 'STL': 274, 'STS': 275, 'STT': 276, 'STX': 277, 'SUN': 278, 'SWO': 279, 'SYR': 280, 'TBN': 281, 'TLH': 282, 'TPA': 283, 'TRI': 284, 'TTN': 285, 'TUL': 286, 'TUS': 287, 'TVC': 288, 'TXK': 289, 'TYR': 290, 'TYS': 291, 'VCT': 292, 'VEL': 293, 'VPS': 294, 'XNA': 295, 'XWA': 296, 'YAK': 297, 'YKM': 298, 'YUM': 299}

encoder_dept = {'ABE': 0, 'ABI': 1, 'ABQ': 2, 'ABR': 3, 'ABY': 4, 'ACK': 5, 'ACT': 6, 'ACV': 7, 'ACY': 8, 'ADQ': 9, 'AEX': 10, 'AGS': 11, 'AKN': 12, 'ALB': 13, 'AMA': 14, 'ANC': 15, 'APN': 16, 'ASE': 17, 'ATL': 18, 'ATW': 19, 'AUS': 20, 'AVL': 21, 'AVP': 22, 'AZA': 23, 'AZO': 24, 'BDL': 25, 'BET': 26, 'BGR': 27, 'BHM': 28, 'BIH': 29, 'BIL': 30, 'BIS': 31, 'BJI': 32, 'BLI': 33, 'BLV': 34, 'BMI': 35, 'BNA': 36, 'BOI': 37, 'BOS': 38, 'BQK': 39, 'BRD': 40, 'BRO': 41, 'BTM': 42, 'BTR': 43, 'BTV': 44, 'BUF': 45, 'BUR': 46, 'BWI': 47, 'BZN': 48, 'CAE': 49, 'CAK': 50, 'CDV': 51, 'CHA': 52, 'CHO': 53, 'CHS': 54, 'CID': 55, 'CKB': 56, 'CLE': 57, 'CLL': 58, 'CLT': 59, 'CMH': 60, 'CMI': 61, 'CMX': 62, 'CNY': 63, 'COS': 64, 'COU': 65, 'CRP': 66, 'CRW': 67, 'CSG': 68, 'CVG': 69, 'CWA': 70, 'DAB': 71, 'DAL': 72, 'DAY': 73, 'DBQ': 74, 'DCA': 75, 'DDC': 76, 'DEC': 77, 'DEN': 78, 'DFW': 79, 'DHN': 80, 'DLH': 81, 'DRO': 82, 'DSM': 83, 'DTW': 84, 'DVL': 85, 'EAR': 86, 'ECP': 87, 'EGE': 88, 'EKO': 89, 'ELM': 90, 'ELP': 91, 'EUG': 92, 'EVV': 93, 'EWR': 94, 'EYW': 95, 'FAI': 96, 'FAR': 97, 'FAT': 98, 'FAY': 99, 'FCA': 100, 'FLG': 101, 'FLL': 102, 'FNT': 103, 'FOD': 104, 'FSD': 105, 'FSM': 106, 'FWA': 107, 'GCC': 108, 'GCK': 109, 'GEG': 110, 'GFK': 111, 'GGG': 112, 'GJT': 113, 'GNV': 114, 'GPT': 115, 'GRB': 116, 'GRI': 117, 'GRK': 118, 'GRR': 119, 'GSO': 120, 'GSP': 121, 'GTF': 122, 'GTR': 123, 'GUM': 124, 'HDN': 125, 'HHH': 126, 'HIB': 127, 'HLN': 128, 'HNL': 129, 'HOU': 130, 'HPN': 131, 'HRL': 132, 'HSV': 133, 'HYS': 134, 'IAD': 135, 'IAH': 136, 'ICT': 137, 'IDA': 138, 'ILM': 139, 'IMT': 140, 'IND': 141, 'INL': 142, 'ISP': 143, 'ITH': 144, 'ITO': 145, 'JAC': 146, 'JAN': 147, 'JAX': 148, 'JFK': 149, 'JLN': 150, 'JMS': 151, 'JNU': 152, 'JST': 153, 'KOA': 154, 'KTN': 155, 'LAN': 156, 'LAR': 157, 'LAS': 158, 'LAX': 159, 'LBB': 160, 'LBE': 161, 'LBF': 162, 'LBL': 163, 'LCK': 164, 'LEX': 165, 'LFT': 166, 'LGA': 167, 'LGB': 168, 'LIH': 169, 'LIT': 170, 'LRD': 171, 'LSE': 172, 'MAF': 173, 'MBS': 174, 'MCI': 175, 'MCO': 176, 'MCW': 177, 'MDT': 178, 'MDW': 179, 'MEM': 180, 'MFE': 181, 'MFR': 182, 'MGM': 183, 'MHK': 184, 'MHT': 185, 'MIA': 186, 'MKE': 187, 'MKG': 188, 'MLB': 189, 'MLI': 190, 'MLU': 191, 'MOB': 192, 'MOT': 193, 'MRY': 194, 'MSN': 195, 'MSO': 196, 'MSP': 197, 'MSY': 198, 'MTJ': 199, 'MVY': 200, 'MYR': 201, 'OAK': 202, 'OGG': 203, 'OKC': 204, 'OMA': 205, 'OME': 206, 'ONT': 207, 'ORD': 208, 'ORF': 209, 'ORH': 210, 'PAE': 211, 'PBG': 212, 'PBI': 213, 'PDX': 214, 'PGD': 215, 'PHL': 216, 'PHX': 217, 'PIA': 218, 'PIB': 219, 'PIE': 220, 'PIH': 221, 'PIT': 222, 'PLN': 223, 'PNS': 224, 'PRC': 225, 'PSC': 226, 'PSE': 227, 'PSG': 228, 'PSM': 229, 'PSP': 230, 'PVD': 231, 'PVU': 232, 'PWM': 233, 'RAP': 234, 'RDD': 235, 'RDM': 236, 'RDU': 237, 'RFD': 238, 'RHI': 239, 'RIC': 240, 'RKS': 241, 'RNO': 242, 'ROA': 243, 'ROC': 244, 'ROW': 245, 'RST': 246, 'RSW': 247, 'SAF': 248, 'SAN': 249, 'SAT': 250, 'SAV': 251, 'SBA': 252, 'SBN': 253, 'SBP': 254, 'SCK': 255, 'SDF': 256, 'SEA': 257, 'SFB': 258, 'SFO': 259, 'SGF': 260, 'SGU': 261, 'SHR': 262, 'SHV': 263, 'SIT': 264, 'SJC': 265, 'SJT': 266, 'SJU': 267, 'SLC': 268, 'SLN': 269, 'SMF': 270, 'SNA': 271, 'SPS': 272, 'SRQ': 273, 'STL': 274, 'STS': 275, 'STT': 276, 'STX': 277, 'SUN': 278, 'SWO': 279, 'SYR': 280, 'TBN': 281, 'TLH': 282, 'TPA': 283, 'TRI': 284, 'TTN': 285, 'TUL': 286, 'TUS': 287, 'TVC': 288, 'TXK': 289, 'TYR': 290, 'TYS': 291, 'VCT': 292, 'VEL': 293, 'VPS': 294, 'WRG': 295, 'XNA': 296, 'XWA': 297, 'YAK': 298, 'YUM': 299}

encoder_reversed = {v: k for k, v in encoder.items()}
encoder_origin_reversed = {v: k for k, v in encoder_origin.items()}
encoder_dept_reversed = {v: k for k, v in encoder_dept.items()}

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
    try:
        rain = float(weather_info['data'][0]['rain']['inches'])
    except:
        rain = 0.085813

    try:
        temp = float(weather_info['data'][0]['temperature']['fahrenheit'])
    except:
        temp = 57.638452

    try:
        wind = float(weather_info['data'][0]['wind']['speed_mph'])
    except:
        wind = 8.415633

    try:
        wind_direction = float(weather_info['data'][0]['wind']['degrees'])
    except:
        wind_direction = 197.307566

    snow = 0.024907
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
        snow = 0.024907
    print("PRINTING WEATHER")
    print(wind, wind_direction, rain, temp, snow)




    return wind, wind_direction, rain, temp, snow

def get_airport_name(flight_data):
    data = flight_data["response"]

    dep_airport_name = data["dep_name"]
    dep_city = data["dep_city"]
    arr_airport_name = data["arr_name"]
    arr_city = data["arr_city"]

    airport_info = {
        "dep_airport_name" : dep_airport_name,
        "dep_city" : dep_city,
        "arr_airport_name" : arr_airport_name,
        "arr_city" : arr_city
    }
    return airport_info

def extract_flight_data(flight_data):
    # with open(flight_data_json) as file:
    #     response = json.load(file)
    data = flight_data["response"]
    # print("This is the response!")
    # print(data)
    # date_time combined
    date_time = data["dep_time"] # date is in 2023-12-03 20:05
    dep_date, dep_time = date_time.split()

    _, arr_time = data["arr_time"].split()

    # get the day of week
    input_date = datetime.strptime(dep_date, '%Y-%m-%d')
    day_of_week = input_date.weekday()

    # extract each value needed
    _, month, day = dep_date.split("-")
    unique_carrier_id = data["airline_iata"]
    flight_number = int(data["flight_number"])
    origin_airport = data["dep_iata"]
    destination_airport = data["arr_iata"]

    # for time, we convert it into minutes
    def convert_time_to_min(time):
        hour, minute = time.split(":")
        return str(int(hour) * 60 + int(minute))

    dep_time = convert_time_to_min(dep_time)
    arr_time = convert_time_to_min(arr_time)

    new_data = {
        "month": int(month),
        "day": int(day),
        "day_of_week": int(day_of_week),
        "unique_carrier_id": encoder[unique_carrier_id],
        "flight_number": int(flight_number),
        "origin_airport": encoder_origin[origin_airport],
        "destination_airport": encoder_dept[destination_airport],
        "expected_departure_time": int(dep_time),
        "expected_arrival_time": int(arr_time)

    }


    return new_data



def convert_to_dataframe(wind, wind_direction, rain, temp, snow, wind_d, wind_direction_d, rain_d, temp_d, snow_d):

    data = {
        'awnd_x': wind,
        'prcp_x': rain,
        'snow_x': snow,
        'tavg_x': temp,
        'wdf2_x': wind_direction,
        'awnd_y': wind_d,
        'prcp_y': rain_d,
        'snow_y': snow_d,
        'tavg_y': temp_d,
        'wdf2_y': wind_direction_d
    }

    # 'awnd_x', 'prcp_x', 'snow_x', 'snwd_x','tavg_x', 'wdf2_x


    return data


def combine_json_files(jsons):
    combined_data = {}

    for json in jsons:
        for key in json:
            combined_data[key] = json[key]
    return combined_data

@app.route('/predict', methods=['POST'])
def predict():
    airlabs_api_key = "5786f070-a648-40df-9078-cd2fa6e66ee4"
    checkwx_api_key = '82c5df5581d043c9b15719eafd'

    #NEED TO PULL FLIGHT NUMBER FROM FRONTEND
    data = request.json
    flight_number = data["flight_number"]


    flight_info = get_flight_info(flight_number, airlabs_api_key)
    flight_json = extract_flight_data(flight_info)

    airport_info = get_airport_name(flight_info)

    icao_code_origin = "K" + str(encoder_origin_reversed[flight_json["origin_airport"]])
    icao_code_dest = "K" + str(encoder_dept_reversed[flight_json["destination_airport"]])

    weather_info = get_weather_info(icao_code_origin, checkwx_api_key)
    weather_info_dest = get_weather_info(icao_code_dest, checkwx_api_key)



    wind, wind_direction, rain, temp, snow = extract_weather_data(weather_info)


    wind_d, wind_direction_d, rain_d, temp_d, snow_d = extract_weather_data(weather_info_dest)

    json_weather = convert_to_dataframe(wind, wind_direction, rain, temp, snow, wind_d, wind_direction_d, rain_d, temp_d, snow_d)



    # combined flight and weather
    json_files = [flight_json, json_weather]

    combined_data = combine_json_files(json_files)

    json_final = json.dumps(combined_data, indent=2)

    # connecting to predict
    data = json.loads(json_final)

    features_in_order = ['month', 'day', 'day_of_week',
                            'unique_carrier_id', 'flight_number', 'origin_airport', 'destination_airport',
                            'expected_departure_time', 'expected_arrival_time',
                            'awnd_x', 'prcp_x', 'snow_x',  'tavg_x', 'wdf2_x',
                            'awnd_y', 'prcp_y', 'snow_y', 'tavg_y', 'wdf2_y']

    features_values = [float(data[feature]) for feature in features_in_order]

    # First model
    delay_prediction_prob = rf_delay_classifier.predict_proba([features_values])
    delay_probability = delay_prediction_prob[0][0]

    # Second model
    delay_duration_prediction = rf_delay_bucket.predict_proba([features_values]).ravel()


    predictions = {
        'Probability of No Delay': delay_probability,
        'Probability Buckets': list(delay_duration_prediction)}

    copy_flight_json = flight_json.copy()
    copy_flight_json["origin_airport"] = encoder_origin_reversed[flight_json["origin_airport"]]
    copy_flight_json["destination_airport"] = encoder_dept_reversed[flight_json["destination_airport"]]

    to_combined = [airport_info, copy_flight_json, json_weather, predictions]
    combined = combine_json_files(to_combined)
    print("copy_dict")
    print(copy_flight_json)
    print("COMBINED PRINT")
    print(combined)

    final_final = json.dumps(combined, indent=2)
    return json.loads(final_final)






if __name__ == "__main__":
    app.run(debug=True)
    # main()
