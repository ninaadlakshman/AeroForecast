import React from 'react'; 
import { Fieldset } from 'primereact/fieldset';
import { Airport } from '../interface/airport';
import './AirportInformation.css';
import moment from "moment";
import { Chip } from 'primereact/chip';
import timeSymbol from '../assets/time.png'

type AirportInformationProps = {
    airport: Airport
    isDeparting: boolean
}
export default function AirportInformation(props: AirportInformationProps) {
    const {airport, isDeparting} = props;
    const formattedDate = moment(airport.flightInfo.time).format('MMMM Do, YYYY h:mm A');
    const relativeTime = moment(airport.flightInfo.time).fromNow(); // "a few seconds ago"

    const departingAirportTemplate = (
        <div className="flex align-items-center departing-airport-text">
            <span className="font-bold text-lg">Departing Airport </span>
            <span className="pi pi-arrow-right"></span>
        </div>
    );

    const arrivingAirportTemplate = (
        <div className="flex align-items-center arriving-airport-text">
            <span className="pi pi-arrow-right"></span>
            <span className="font-bold text-lg"> Arriving Airport</span>
        </div>
    );

    const airportHeaderTemplate = isDeparting ? departingAirportTemplate : arrivingAirportTemplate;
    
    const chipContent = (
        <>
            <span className="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center">T</span>
            <span className="ml-2 font-medium">{relativeTime}</span>
        </>
    );
    return (
        <div className="card">
            <Fieldset legend={airportHeaderTemplate}>
                <div className="d-flex flex-column">
                    <div>
                        <strong>Airport: </strong> {airport.name}
                    </div>
                    <div className="top-space">
                        <strong>Time: </strong> {formattedDate}
                    </div>
                    {isDeparting && <Chip label={relativeTime} image={timeSymbol} className="w-50 top-space" />}
                </div>
            </Fieldset>
        </div>
    )
}
        