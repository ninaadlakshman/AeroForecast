import { Airline } from "./airline";
import { Airport } from "./airport";

export interface FlightDelay {
    departing: {
        airport: Airport;
        temp: number;
        prec: number;
        snow: number;
        time: Date;
    };
    arrival: {
        airport: Airport;
        temp: number;
        prec: number;
        snow: number;
        time: Date;
    }
    airlineCode: string | null;
    flightNumber: number | null;
    onTimeProbability: number;
    delayBucketProbabilities: number[]
}

export const delayBuckets = ['0-14 min', '15-29 min', '30-59 min', '60-89 min', '90-119 min', '120+min'];