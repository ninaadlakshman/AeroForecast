export interface Airport {
    name: string;
    lat: number;
    long: number;
    flightInfo: {
        time: Date;
    }
}