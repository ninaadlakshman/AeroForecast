import pandas as pd
import random
import mysql.connector
import os
from datetime import datetime

def connect_to_mysql():
    try:
        conn = mysql.connector.connect(
            host='your host',
            user='root',
            password='Your password',
            database='aerocast'
        )
        print("We are connected to MySQL")
        return conn
    except mysql.connector.Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Function to loop through CSV files, sample rows, and insert into MySQL table
def sample_and_insert_to_mysql(folder_path):
    conn = connect_to_mysql()
    if conn is None:
        return

    cursor = conn.cursor()
    count = 0
    for file_name in os.listdir(folder_path):
        if file_name.endswith('.csv'):
            file_path = os.path.join(folder_path, file_name)
            try:
                df = pd.read_csv(file_path)
                columns_to_drop = ["CARRIER_DELAY", "WEATHER_DELAY", "NAS_DELAY", "SECURITY_DELAY", "LATE_AIRCRAFT_DELAY", "TAXI_IN", "TAXI_OUT", "WHEELS_ON", "WHEELS_OFF", "CANCELLED", "DIVERTED"]
                columns_exist = all(col in df.columns for col in columns_to_drop)
                df.drop(columns=columns_to_drop, inplace=True)

                # drop all nan rows
                df.dropna(subset=["DEP_DELAY_NEW", "ARR_DELAY_NEW"], how="any", inplace=True)
                sampled_rows = df.sample(n=1000, replace=False)



                for index, row in sampled_rows.iterrows():
                    date_value = datetime.strptime(row["FL_DATE"], "%m/%d/%Y %I:%M:%S %p").strftime("%Y-%m-%d")

                    sql = "INSERT INTO FlightInformation (flight_date, expected_departure_time, unique_carrier_id, flight_number, origin_airport, destination_airport, departure_delay, expected_arrival_time, arrival_delay, FlightID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"  # Replace column names
                    values = (date_value, row["CRS_DEP_TIME"] * 100, row["OP_UNIQUE_CARRIER"], row["OP_CARRIER_FL_NUM"], row["ORIGIN"], row["DEST"], row["DEP_DELAY_NEW"], row["CRS_ARR_TIME"] * 100, row["ARR_DELAY_NEW"], count)
                    cursor.execute(sql, values)
                    count += 1

                conn.commit()
                print(f"Inserted 1000 rows from {file_path} to MySQL table.")
            except Exception as e:
                conn.rollback()
                print(f"Error: {e} occurred while processing {file_path}. Rolling back changes.")

    cursor.close()
    conn.close()

# List of file paths (replace with your file paths)
folder_path = "/Users/alex.jg.kim/Desktop/GT/2023_Fall/CS_6242/Project/dataset"

# Call function to sample rows and insert into MySQL table
sample_and_insert_to_mysql(folder_path)
