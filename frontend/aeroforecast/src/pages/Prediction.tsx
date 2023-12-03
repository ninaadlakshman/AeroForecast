import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import PredictionPie from '../components/PredictionPie';
import './Prediction.css'
import { Message } from 'primereact/message';
import PredictionChart from '../components/PredictionChart';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';
import PredictionMap from '../components/PredictionMap';
import AirportInformation from '../components/AirportInformation';
import { Airport } from '../interface/airport';

const Prediction = () => {
    const [showMap, setShowMap] = useState(false)
    const mapMargin =  {top: 50, right: 150, bottom: 50, left: 50}

    const arrivalAirport: Airport = {
        name: "San Francisco Airport",
        lat: 37.774929,
        long: -122.419418,
        flightInfo: {
            time: new Date(2023, 11, 2, 23, 12, 10, 10)
        }
    }

    const departingAirport = {
        name: "Philadelphia International Airport",
        lat: 39.952583,
        long: -75.165222,
        flightInfo: {
            time: new Date(2023, 11, 2, 23, 10, 10, 10)
        }
    }

    const mapFooter = <>
        {!showMap && <Button label="Show Map" className="w-100" icon="pi pi-map" iconPos="top" onClick={() => setShowMap(true)} raised/>}
        <Dialog header="Flight Visualization" visible={showMap} style={{ width: '85vw' }} onHide={() => setShowMap(false)}>
            <PredictionMap margin={mapMargin} arrivalAirport={arrivalAirport} departingAirport={departingAirport}/>
        </Dialog>
    </>
    return (
        <div className="h-100 mt-2 g-2 container">
            <div className="row">
                <div className="col">
                    <Card className="h-100" title="Flight Prediction">
                        <div className="d-flex flex-column justify-content-center h-100">
                            <Message
                                className="custom-message"
                                severity="success"
                                text="Likely On-Time" />
                            <p className="m-0 mt-2 text-center">
                                We predict, with high likelihood, that your flight will depart on time. Looks like you won't have to wait!
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="col card flex justify-content-center">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <PredictionPie/>
                        </div>
                    </Card>
                </div>
                <div className="col">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <PredictionChart/>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="row h-50 mt-2">
                <Card className="col-sm-12 mr-2 container" footer={mapFooter}>
                    <div className="d-flex">
                        <div className="w-50 h-100">
                            <AirportInformation airport={departingAirport} isDeparting={true}/>
                        </div>
                        <div className="w-50 h-100">
                            <AirportInformation airport={arrivalAirport} isDeparting={false}/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Prediction;