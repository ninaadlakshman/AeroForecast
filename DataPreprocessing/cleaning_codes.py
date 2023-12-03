import pandas as pd

df = pd.read_csv("csv_files/airports_codes.csv")
print(len(df))

df.dropna(subset=['AIRPORT_STATE_NAME'], inplace=True)
print(len(df))

df.drop_duplicates(subset=['AIRPORT_ID'], keep='last', inplace=True)

df.to_csv('cleaned_airports_codes.csv', index=False)


