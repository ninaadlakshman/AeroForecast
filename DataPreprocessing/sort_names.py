import pandas as pd

names = pd.read_csv('csv_files/name_to_name.csv')

names= names.sort_values(by='lev', ascending=True)
names.to_csv('sorted_name_to_name.csv', index=False)
