import { Airport } from "../interfaces/airport";
import airports from '../assets/geo/airport_data.json'
import { FlightDelay } from "../interfaces/flight-delay";
import { Airline } from "../interfaces/airline";

export function formatResponse(data: any, params: {airlineCode: string, flightNumber: number}) {
    const departingAirportInfo = airports.find((airport) => airport.origin_airport === data.dep_iata);
    const arrivalAirportInfo = airports.find((airport) => airport.origin_airport === data.arr_iata);

    const departingAirport: Airport = {
        name: data.dep_airport_name,
        code: data.dep_iata,
        lat: departingAirportInfo?.latitude ?? 0,
        long: departingAirportInfo?.longitude ?? 0,
    }

    const arrivalAirport: Airport = {
        name: data.arr_airport_name,
        code: data.arr_iata,
        lat: arrivalAirportInfo?.latitude ?? 0,
        long: arrivalAirportInfo?.longitude ?? 0,
    }

    const flightDelay: FlightDelay = {
        departing: {
            airport: departingAirport,
            temp: data.tavg_x,
            snow: data.snow_x,
            prec: data.prcp_x,
            time: new Date(data.dep_date_utc)
        },
        arrival: {
            airport: arrivalAirport,
            temp: data.tavg_y,
            snow: data.snow_y,
            prec: data.prcp_y,
            time: new Date(data.arr_date_utc)
        },
        airlineCode: params.airlineCode,
        flightNumber: +params.flightNumber,
        onTimeProbability: data.probability_of_no_delay,
        delayBucketProbabilities: data.probability_buckets
    }
    console.log(flightDelay)
    return flightDelay;
}

export function convertDateToString(dateObject: Date) {
    var month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    var day = String(dateObject.getUTCDate()).padStart(2, '0');
    var year = dateObject.getUTCFullYear();

    var dateString = year + '-' + month + '-' + day;
    return dateString;
}