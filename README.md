# AeroForecast ✈️

Flight delays are a common occurrence, with an average of 30,000 delayed flights globally each day. In the United States alone, this number ranges from 7,000 to 9,000 flights daily. These delays can significantly impact people's travel plans, causing inconvenience and disruptions. Moreover, the unpredictability and last-minute nature of these delays make it challenging for individuals to plan their personal or business-related circumstances around them. Recognizing the need for a solution, we introduce AeroForecast - an application dedicated to predicting and visualizing flight delays.

## Purpose 🎯

AeroForecast aims to provide a valuable tool for travelers, allowing them to anticipate and plan for potential flight delays. By leveraging two sophisticated models trained on data sourced from the National Oceanic and Atmospheric Administration (NOAA), the application offers insights into the likelihood of delays, empowering users to make informed decisions about their travel arrangements.

## Key Features 🚀

- **Flight Delay Prediction:** AeroForecast utilizes advanced models to predict the likelihood of flight delays, helping users plan their journeys more effectively.

- **US Coverage:** The application considers data from a vast number of flights in the US, ensuring comprehensive coverage and accuracy in predictions.

- **Real-time Updates:** AeroForecast provides real-time updates on flight statuses and potential delays, keeping users informed about any changes to their travel plans.

- **User-friendly Visualization:** The intuitive visualization tool enables users to track and understand the probability of delays, allowing for quick and informed decision-making.

## Data Source 🌐

AeroForecast relies on data sourced from the [National Oceanic and Atmospheric Administration](https://www.ncdc.noaa.gov/cdo-web/search) (NOAA) and [Bureau of Transportation Stastics](https://www.transtats.bts.gov/ONTIME/), ensuring the accuracy and reliability of the information used for training and predictions.


## Getting Started 🛠️

For ease of use, we have included requirements.txt and package.json files. Run the below commands from within the project root directory to install the required dependencies.

```bash
pip install -r requirements.txt
npm install
```

### You must get the API keys at the following websites:
For flights: [Airlabs](https://airlabs.co/docs/flight)  
For weather: [CheckWX](https://www.checkwxapi.com/documentation/code/samples) 

## Usage 🖥️
Once the required dependencies are installed, simply run `npm start` and the application will run on your local machine.

## AeroForecast Team 👥
Amish Saini, Kartik Narang, Nathan Wang, Aryan Musharaf, Ninaad Lakshman, Alex Jaegook Kim.

## Contributions 🤝
We welcome contributions to AeroForecast! If you have ideas for new features, improvements, or bug fixes, please feel free to submit a pull request.

## License 📄

AeroForecast is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. Feel free to use, modify, and distribute the application in accordance with the terms of this license.



