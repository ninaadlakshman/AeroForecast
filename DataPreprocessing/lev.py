import pandas as pd
import editdistance
import tqdm

airports_codes = pd.read_csv('csv_files/cleaned_airports_codes.csv')
airports_weather = pd.read_csv('csv_files/airports_weather.csv')

# Function to calculate Levenshtein distance between two strings
def calculate_distance(str1, str2):
    return editdistance.eval(str1, str2)

# Calculate Levenshtein distance between each pair of values in columns from both CSV files
results = []
good_results_val1 = []
for i in tqdm.tqdm(range(len(airports_codes['DISPLAY_AIRPORT_NAME']))):
    val1 = airports_codes['DISPLAY_AIRPORT_NAME'][i]
    val1_temp = str(val1).lower()
    val1_temp = val1_temp.replace("airport", "")
    val1_temp = val1_temp.replace("international", "")
    val1_temp = val1_temp.replace("regional", "")
    seen_set = []
    for j in range(len(airports_weather['name'])):
        val2 = airports_weather['name'][j]
        val2_temp = str(val2).lower()[:-7]
        val2_temp = val2_temp.replace("airport", "")
        val2_temp = val2_temp.replace("international", "")
        val2_temp = val2_temp.replace("regional", "")
        if val1 in good_results_val1 or val2_temp in seen_set:
            continue
        distance = calculate_distance(str(val1_temp), str(val2_temp))
        seen_set.append(val2_temp)
        if distance <= 3:
            results.append((airports_codes['AIRPORT_ID'][i], airports_codes['AIRPORT'][i], val1, val2, distance, airports_codes['LATITUDE'][i], airports_codes['LONGITUDE'][i]))
        if distance == 0:
            good_results_val1.append(val1)

# Convert results to a DataFrame
result_df = pd.DataFrame(results, columns=['id', 'code', 'code_name', 'weather_name', 'lev', 'lat', 'long'])
result_df = result_df.sort_values(by="lev", ascending=True)

result_df.to_csv('name_to_name.csv', index=False)