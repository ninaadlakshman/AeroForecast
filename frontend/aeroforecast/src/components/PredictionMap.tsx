import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import usGeo from '../assets/geo/us.json'
import airportDelayMap from '../assets/geo/airport_delay_map.json'
import './PredictionMap.css';
import { Airport, AirportDelayPoint } from '../interfaces/airport';
import AirportInformation from './AirportInformation';
import { FlightDelay } from '../interfaces/flight-delay';

type PredictionMapProps = {
  margin:{
    [key:string]:number
  },
  flightDelay: FlightDelay
}

const PredictionMap = (props: PredictionMapProps) => {
  const svgRef = useRef(null);
  useEffect(() => {
    if(svgMap) {
        let svg = d3.select(svgRef.current)
        createMap(svg)
   }
  }, [svgRef.current])

  const {margin, flightDelay} = props;
  const vw75 = 0.75 * window.innerWidth;
  const vh75 = 0.75 * window.innerHeight;
  var width = vw75 - margin.left - margin.right;
  var height = vh75 - margin.top - margin.bottom;

  let projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(1100)

  let path = d3.geoPath()
    .projection(projection)
  let svgMap = d3.select("#map")

  function getCoords(long: number, lat: number): number[] {
    return (projection([long, lat]) as number[]);
  }
  
  function createMap(svg: any) {
    let states = (topojson.feature(usGeo as any, usGeo.objects.states as any) as any).features

    svg.selectAll(".state")
        .data(states)
        .enter().append("path")
        .attr("d", (path as any))
        .attr("class", "state");

    const departingX = (getCoords(flightDelay.departingAirport.long, flightDelay.departingAirport.lat) as any)[0]
    const departingY = (getCoords(flightDelay.departingAirport.long, flightDelay.departingAirport.lat) as any)[1]
    const arrivalX = (getCoords(flightDelay.arrivalAirport.long, flightDelay.arrivalAirport.lat) as any)[0]
    const arrivalY = (getCoords(flightDelay.arrivalAirport.long, flightDelay.arrivalAirport.lat) as any)[1]

    const airportMin = Math.min(...airportDelayMap.map((airport: AirportDelayPoint) => (airport.delayed_flights_count / airport.total_flights) as number))
    const airportMax = Math.max(...airportDelayMap.map((airport: AirportDelayPoint) => (airport.delayed_flights_count / airport.total_flights) as number))

    const colorScale = d3.scaleQuantile()
      .domain([airportMin, airportMax])
      .range([
        "#ffffff",
        "#fff0f0",
        "#ffd0d0",
        "#ffb0b0",
        "#ff9090",
      ] as any);

    svg.selectAll(".airport")
      .data(airportDelayMap)
      .enter().append("circle")
      .attr("class", "airport")
      .attr("r", (airport: AirportDelayPoint) => airport.origin_airport === flightDelay.arrivalAirport.airport_code || airport.origin_airport === flightDelay.departingAirport.airport_code ? 8 : 3)
      .attr("stroke", (airport: AirportDelayPoint) => {
        if (airport.origin_airport === flightDelay.arrivalAirport.airport_code) {
          return "#F89880"
        } else if (airport.origin_airport === flightDelay.departingAirport.airport_code) {
          return "#408559"
        }
        return null
      })
      .attr("stroke-width", 5)
      .attr("cx", (airport: AirportDelayPoint) => {
        const coords = getCoords(airport.longitude, airport.latitude);
        if (coords) {
          return coords[0]
        }
      })
      .attr("cy", (airport: AirportDelayPoint) => {
        const coords = getCoords(airport.longitude, airport.latitude);
        if (coords) {
          return coords[1]
        }
      })
      .attr("fill", (airport: AirportDelayPoint) => colorScale(airport.delayed_flights_count / airport.total_flights));

    // svg.append("circle")
    //   .attr("class", "destinationAirport location departing")
    //   .attr("r", 6)
    //   .attr("cx", () => departingX)
    //   .attr("cy", () => departingY);

    // svg.append("circle")
    //     .attr("class", "arrivalAirport location arriving")
    //     .attr("r", 8)
    //     .attr("cx", () => arrivalX)
    //     .attr("cy", () => arrivalY);

    const flightPath = d3.line()
        .x(d => d[0])
        .y(d => d[1]);

    svg.append("marker")
        .attr("id", "triangle")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "white")
        .attr("class", "arrowhead");
    
    svg.append("path")
        .attr('d', flightPath([[departingX, departingY], [arrivalX, arrivalY]]))
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("marker-end", "url(#triangle)")
        .attr("id", "flightPath")

  }

  return (
    <>
        <div className="d-flex flex-row">
            <svg
                ref={svgRef}
                id="map"
                height={height}
                width={width}
                overflow="visible"
                >
            </svg>
            <div className="flex-column mt-2">
              <div>
                <AirportInformation flightDelay={flightDelay} isDeparting={true}/>
              </div>
              <div className="mt-2">
                <AirportInformation flightDelay={flightDelay} isDeparting={false}/>
              </div>
              <div className="mt-2">
                <strong>Legend:</strong> Redder airports signify higher delays
              </div>
            </div>
        </div>
    </>)
}

export default PredictionMap;