import { Airline } from "./airline";
import { Airport } from "./airport";

export interface FlightDelay {
    departingAirport: Airport;
    arrivalAirport: Airport;
    airline: Airline | undefined;
    flightNumber: string | null;
    departingTime: Date;
    arrivalTime: Date;
    onTimeProbability: number;
    delayBucketProbabilities: number[]
}

export const delayBuckets = ['0-14 min', '15-29 min', '30-59 min', '60-89 min', '90-119 min', '120+min'];