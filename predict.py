from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

rf_delay_classifier = joblib.load('rf_delay_binary_model.pkl')
rf_delay_bucket = joblib.load('rf_delay_bucket_model.pkl')

@app.route('/predict_delay', methods=['POST'])
def predict_delay():
    try:
        print("hello")
        data = request.json

        features_in_order = ['month', 'day', 'day_of_week',
                              'unique_carrier_id', 'flight_number', 'origin_airport', 'destination_airport',
                              'expected_departure_time', 'expected_arrival_time',
                              'awnd_x', 'prcp_x', 'snow_x',  'tavg_x', 'wdf2_x',
                              'awnd_y', 'prcp_y', 'snow_y', 'tavg_y', 'wdf2_y']

        features_values = [data[feature] for feature in features_in_order]

        # First model
        delay_prediction_prob = rf_delay_classifier.predict_proba([features_values])
        delay_probability = delay_prediction_prob[0][0]

        # Second model
        delay_duration_prediction = rf_delay_bucket.predict_proba([features_values]).ravel()
        
        return jsonify({'Probability of No Delay': delay_probability,
                        'Probability Buckets': list(delay_duration_prediction)})


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
