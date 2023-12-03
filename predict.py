from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

rf_delay_classifier = joblib.load('rf_delay_classifier_model.pkl')
rf_delay_regression = joblib.load('rf_delay_regression_model.pkl')

@app.route('/predict_delay', methods=['POST'])
def predict_delay():
    try:
        data = request.json['features']
        delay_prediction = rf_delay_classifier.predict([data])[0]

        if delay_prediction == 0:
            return jsonify({'prediction': 'No Delay'})

        delay_duration_prediction = rf_delay_regression.predict([data])[0]

        return jsonify({'prediction': f'Delay of {delay_duration_prediction} minutes'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
