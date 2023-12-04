import React, { useState } from 'react';
import './AirlineSelect.css';
import { Chart } from 'primereact/chart';
import { FlightDelay } from '../interfaces/flight-delay';

type PredictionPieProps = {
    flightDelay: FlightDelay
}
const PredictionPie = (props: PredictionPieProps) => {
    const {flightDelay} = props;
    const data = [flightDelay.onTimeProbability * 100, (1 - flightDelay.onTimeProbability) * 100]
    const [chartData] = useState({
        labels: ['On-time', 'Delayed'],
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "#3BEDB7",
                    "#FFCE56",
                ],
                hoverBackgroundColor: [
                    "#3BEDB7",
                    "#FFCE56"
                ],
                tooltip: {
                    callbacks: {
                        label: function(context: any) {
                            let label = context.label;
                            let value = context.formattedValue;
            
                            let sum = 0;
                            context.chart.data.datasets[0].data.map((data: any) => {
                                sum += Number(data);
                            });
            
                            let percentage = (value * 100 / sum).toFixed(0) + '%';
                            return label + ": " + percentage;
                        }
                    }
                }
            }]
    });

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });
    return (
        <Chart type="pie" data={chartData} options={lightOptions}/>
    )
};    


export default PredictionPie;
