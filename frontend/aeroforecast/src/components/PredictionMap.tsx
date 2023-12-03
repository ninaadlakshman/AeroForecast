import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import usGeo from '../assets/geo/us.json'
import './PredictionMap.css';
import { Airport } from '../interface/airport';
import AirportInformation from './AirportInformation';

type PredictionMapProps = {
  margin:{
    [key:string]:number
  },
  departingAirport: Airport,
  arrivalAirport: Airport
}

const PredictionMap = (props: PredictionMapProps) => {
  const svgRef = useRef(null);
  useEffect(() => {
    if(svgMap) {
        let svg = d3.select(svgRef.current)
        createMap(svg)
   }
  }, [svgRef.current])

  const {margin, departingAirport, arrivalAirport} = props;
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
    let counties = (topojson.feature(usGeo as any, usGeo.objects.counties as any) as any).features
    svg.selectAll(".county")
        .data(counties)
        .enter().append("path")
        .attr("d", (path as any))
        .attr("class", "county")
    svg.selectAll(".state")
        .data(states)
        .enter().append("path")
        .attr("d", (path as any))
        .attr("class", "state");
    
    svg.append("circle")
        .attr("class", "destinationAirport location")
        .attr("r", 5)
        .attr("cx", () => (getCoords(departingAirport.long, departingAirport.lat) as any)[0])
        .attr("cy", () => (getCoords(departingAirport.long, departingAirport.lat) as any)[1]);

    svg.append("circle")
        .attr("class", "arrivalAirport location")
        .attr("r", 5)
        .attr("cx", () => (getCoords(arrivalAirport.long, arrivalAirport.lat) as any)[0])
        .attr("cy", () => (getCoords(arrivalAirport.long, arrivalAirport.lat) as any)[1]);

    const flightPath = d3.line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(d3.curveNatural);
    
    svg.append("path")
        .attr('d', flightPath([getCoords(departingAirport.long, departingAirport.lat) as any, getCoords(arrivalAirport.long, arrivalAirport.lat)]))
        .attr("stroke-width", 1)
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
                <AirportInformation airport={departingAirport} isDeparting={true}/>
                <AirportInformation airport={arrivalAirport} isDeparting={false}/>
            </div>
        </div>
    </>)
}

export default PredictionMap;