import { Card } from 'primereact/card';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PredictionPie from '../components/PredictionPie';
import './Prediction.css'
import { Message } from 'primereact/message';
import PredictionChart from '../components/PredictionChart';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import PredictionMap from '../components/PredictionMap';
import AirportInformation from '../components/AirportInformation';
import { Airport } from '../interfaces/airport';
import { Airline, usAirlines } from '../interfaces/airline';
import { Chip } from 'primereact/chip';
import { FlightDelay } from '../interfaces/flight-delay';
import axios from "axios";
import { formatResponse } from '../utility/formatter';
import { ProgressBar } from 'primereact/progressbar';

const Prediction = (route: any) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log(searchParams.get("flightDate"))
        const flightData = {
            flight_number: searchParams.get("airlineCode") + (searchParams.get("flightNumber") as string),
            flight_date: searchParams.get("flightDate")
        }
        axios.post("https://aeroforecast-backend-48a684300377.herokuapp.com/predict", flightData).then((response: any) => {
            const flightDelay: FlightDelay = formatResponse(response.data, {
                airlineCode: searchParams.get("airlineCode") ?? "",
                flightNumber: +(searchParams.get("flightNumber") as string)
            })
            const airline: Airline | undefined = usAirlines.find((airline) => airline.code === (flightDelay as FlightDelay).airlineCode)
            setFlightDelay(flightDelay)
            setAirlineImgSrc(airline?.imgSrc ?? "")
            setAirlineName(airline?.name ?? "")
            setErrorMessage("")
            setLoading(false)
        }).catch(e => {
            setErrorMessage("Your flight is either invalid or not currently active. Please reinput your flight details.")
            setLoading(false)
        });
    }, [searchParams])
    const [showMap, setShowMap] = useState(false)
    const mapMargin =  {top: 50, right: 150, bottom: 50, left: 50}
    const [flightDelay, setFlightDelay] = useState({} as any)
    const [airlineImgSrc, setAirlineImgSrc] = useState("/")
    const [airlineName, setAirlineName] = useState("")

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


    return <>
        {loading && <ProgressBar mode="indeterminate" className="mt-2" style={{ height: '6px' }}></ProgressBar>}
        {(!errorMessage && !loading) && 
            <div className="h-100 mt-2 g-2 container">
                <div className="row">
                    <div className="col">
                        <Card className="h-100" title="Flight Prediction">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-center align-items-center mr-2">
                                        <img src={airlineImgSrc} className="mr-2" style={{ height: '25px' }} />
                                        <div>{airlineName}</div>
                                    </div>
                                    <Chip label={flightDelay.flightNumber ?? ""} className="align-items-center" />
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
        }
        {(errorMessage && !loading) && 
            <div className="d-flex justify-content-center">
                {errorMessage && <Message severity="error" text={errorMessage} className="mt-2" />}
            </div>
        }
    </>
        
};

export default Prediction;