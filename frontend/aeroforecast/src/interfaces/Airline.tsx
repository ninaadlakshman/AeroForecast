import alaska from '../assets/alaska-airlines.png'
import allegiant from '../assets/allegiant-air.png'
import american from '../assets/american-airlines.png'
import delta from '../assets/delta-airlines.png'
import frontier from '../assets/frontier-airlines.png'
import hawaiian from '../assets/hawaiian-airlines.png'
import jetblue from '../assets/jetblue-airways.png'
import southwest from '../assets/southwest-airlines.png'
import spirit from '../assets/spirit-airlines.png'
import united from '../assets/united-airlines.png'
import skywest from '../assets/skywest-airlines.png'
import endeavor from '../assets/endeavor-air.png'
import republic from '../assets/republic-airways.png'
import psa from '../assets/psa-airlines.png'
import envoy from '../assets/envoy-air.png'
import horizon from '../assets/horizon-air.png'
import mesa from '../assets/mesa-airlines.png'

export interface Airline {
    name: string;
    imgSrc: string;
    code: string;
}

export const usAirlines: Airline[] = [
    { name: "Alaska Airlines", imgSrc: alaska, code: "AS" },
    { name: "Allegiant Air", imgSrc: allegiant, code: "G4" },
    { name: "American Airlines", imgSrc: american, code: "AA" },
    { name: "Delta Air Lines", imgSrc: delta, code: "DL" },
    { name: "Endeavor Air", imgSrc: endeavor, code: "9E" },
    { name: "Envoy Air", imgSrc: envoy, code: "MQ" },
    { name: "Frontier Airlines", imgSrc: frontier, code: "F9" },
    { name: "Hawaiian Airlines", imgSrc: hawaiian, code: "HA" },
    { name: "Horizon Air", imgSrc: horizon, code: "QX" },
    { name: "JetBlue Airways", imgSrc: jetblue, code: "B6" },
    { name: "Mesa Airlines", imgSrc: mesa, code: "YV" },
    { name: "PSA Airlines", imgSrc: psa, code: "OH" },
    { name: "Republic Airways", imgSrc: republic, code: "YX" },
    { name: "SkyWest Airlines", imgSrc: skywest, code: "OO" },
    { name: "Southwest Airlines", imgSrc: southwest, code: "WN" },
    { name: "Spirit Airlines", imgSrc: spirit, code: "NK" },
    { name: "United Airlines", imgSrc: united, code: "UA" },
  ];