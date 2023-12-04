import { Card } from 'primereact/card';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PredictionPie from '../components/PredictionPie';
import './Prediction.css'
import { Message } from 'primereact/message';
import PredictionChart from '../components/PredictionChart';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';
import PredictionMap from '../components/PredictionMap';
import AirportInformation from '../components/AirportInformation';
import { Airport } from '../interfaces/airport';
import { usAirlines } from '../interfaces/airline';
import { Chip } from 'primereact/chip';
import { FlightDelay } from '../interfaces/flight-delay';

const Prediction = (route: any) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const airlineName = searchParams.get("airline");
    const airlineObj = usAirlines.find(usAirline => usAirline.name === airlineName)
    const flightNumber = searchParams.get("flightNumber");

    const [showMap, setShowMap] = useState(false)
    const mapMargin =  {top: 50, right: 150, bottom: 50, left: 50}

    const departingAirport: Airport = {
        airport_code: "PHL",
        name: "Philadelphia International Airport",
        lat: 39.952583,
        long: -75.165222
    }

    const arrivalAirport: Airport = {
        airport_code: "SFO",
        name: "San Francisco Airport",
        lat: 37.774929,
        long: -122.419418,
    }

    const flightDelay: FlightDelay = {
        departingAirport: departingAirport,
        arrivalAirport: arrivalAirport,
        airline: airlineObj,
        flightNumber: flightNumber,
        departingTime: new Date(2023, 11, 3, 23, 12, 10, 10),
        arrivalTime: new Date(2023, 11, 4, 1, 15, 10, 10),
        onTimeProbability: 0.49,
        delayBucketProbabilities: [0.65, 0.25, 0.1, 0, 0, 0]
    }

    const mapFooter = <>
        {!showMap && <Button label="Show Map" className="w-100" icon="pi pi-map" iconPos="top" onClick={() => setShowMap(true)} raised/>}
        <Dialog header="Flight Visualization ✈️" visible={showMap} style={{ width: '85vw' }} onHide={() => setShowMap(false)}>
            <PredictionMap margin={mapMargin} flightDelay={flightDelay}/>
        </Dialog>
    </>

    const predictionText = () => {
        if (flightDelay.onTimeProbability >= 0.75) {
            return {
                severity: "success",
                headerText: "Likely On-Time",
                text: "We predict, with high likelihood, that your flight will depart on time. Looks like you won't have to wait!"
            }
        }

        if (flightDelay.onTimeProbability >= 0.5) {
            return {
                severity: "success",
                headerText: "Probably On-Time",
                text: "We predict that your flight will depart on time. However, there is a fairly high chance it will be delayed."
            }
        }

        if (flightDelay.onTimeProbability >= 0.25) {
            return {
                severity: "warn",
                headerText: "Probably Delayed",
                text: "We predict that your flight will be delayed. However, we are not entirely certain."
            }
        }

        if (flightDelay.onTimeProbability >= 0) {
            return {
                severity: "error",
                headerText: "Likely Delayed",
                text: "We predict, with high likelihood, that your flight will be delayed. Sorry, you may need to wait!"
            }
        }
    }


    return (
        <div className="h-100 mt-2 g-2 container">
            <div className="row">
                <div className="col">
                    <Card className="h-100" title="Flight Prediction">
                        <div className="d-flex flex-column justify-content-center h-100">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center align-items-center mr-2">
                                    <img src={airlineObj?.imgSrc} className="mr-2" style={{ height: '25px' }} />
                                    <div>{airlineObj?.name}</div>
                                </div>
                                <Chip label={flightNumber ?? ""} className="align-items-center" />
                            </div>
                            <Message
                                className="custom-message mt-2"
                                severity={predictionText()?.severity as any}
                                text={predictionText()?.headerText} />
                            <p className="m-0 mt-2 text-center">
                                {predictionText()?.text}
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="col card flex justify-content-center">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <PredictionPie flightDelay={flightDelay}/>
                        </div>
                    </Card>
                </div>
                <div className="col">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <PredictionChart flightDelay={flightDelay}/>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="row h-50 mt-2">
                <Card className="col-sm-12 mr-2" footer={mapFooter}>
                    <div className="d-flex h-100">
                        <div className="w-50">
                            <AirportInformation flightDelay={flightDelay} isDeparting={true}/>
                        </div>
                        <div className="w-50">
                            <AirportInformation flightDelay={flightDelay} isDeparting={false}/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Prediction;