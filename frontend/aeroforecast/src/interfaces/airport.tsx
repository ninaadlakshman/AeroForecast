export interface Airport {
    airport_code: string;
    name: string;
    lat: number;
    long: number;
}

export interface AirportDelayPoint {
    origin_airport: string;
    latitude: number;
    longitude: number;
    total_flights: number;
    delayed_flights_count: number; 
}