export interface Airport {
    name: string;
    code: string;
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