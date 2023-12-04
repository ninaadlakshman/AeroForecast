import React from 'react'; 
import { Fieldset } from 'primereact/fieldset';
import { Airport } from '../interfaces/airport';
import './AirportInformation.css';
import moment from "moment";
import { Chip } from 'primereact/chip';
import timeSymbol from '../assets/time.png'
import flightTimeSymbol from '../assets/flight-time.png'
import { FlightDelay } from '../interfaces/flight-delay';

type AirportInformationProps = {
    flightDelay: FlightDelay
    isDeparting: boolean
}
export default function AirportInformation(props: AirportInformationProps) {
    const {flightDelay, isDeparting} = props;
    // console.log("FLIGHT");
    // console.log(flightDelay)
    const time = isDeparting ? flightDelay.departing.time : flightDelay.arrival.time
    const formattedDate = moment(time).format('MMMM Do, YYYY h:mm A');
    const relativeTime = moment(time).fromNow();
    const flightTimeMoment = moment.duration(moment(flightDelay.arrival.time).diff(flightDelay.departing.time));
    const flightMinutes = flightTimeMoment.minutes() < 10 ? `0${flightTimeMoment.minutes()}` : flightTimeMoment.minutes()
    const flightTime = `Flight Time: ${flightTimeMoment.hours()}h ${flightMinutes}min`

    const departingAirportTemplate = (
        <div className="flex align-items-center departing-airport-text">
            <span className="font-bold text-lg">Departing Airport </span>
            <span className="pi pi-arrow-right"></span>
        </div>
    );

    const arrivingAirportTemplate = (
        <div className="d-flex align-items-center arriving-airport-text">
            <span className="pi pi-arrow-right"></span>
            <span className="font-bold text-lg"> Arriving Airport</span>
        </div>
    );

    const airportHeaderTemplate = isDeparting ? departingAirportTemplate : arrivingAirportTemplate;

    return (
        <Fieldset legend={airportHeaderTemplate}>
            <div>
                <div>
                    <strong>Airport: </strong> {isDeparting ? flightDelay.departing.airport.name : flightDelay.arrival.airport.name}
                </div>
                <div className="top-space">
                    <strong>Time: </strong> {formattedDate}
                </div>
                {isDeparting && <Chip label={relativeTime} image={timeSymbol} className="top-space" />}
                {!isDeparting && <Chip label={flightTime.toString()} image={flightTimeSymbol} className="top-space" />}
            </div>
        </Fieldset>
    )
}
        