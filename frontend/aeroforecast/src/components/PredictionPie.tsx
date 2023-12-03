import React, { useState } from 'react';
import './AirlineSelect.css';
import { Chart } from 'primereact/chart';

const PredictionPie: React.FC = () => {
    const [chartData] = useState({
        labels: ['On-time', 'Delayed', 'Cancelled'],
        datasets: [
            {
                data: [75, 15, 10],
                backgroundColor: [
                    "#3BEDB7",
                    "#FFCE56",
                    "#FF6384"
                ],
                hoverBackgroundColor: [
                    "#3BEDB7",
                    "#FFCE56",
                    "#FF6384"
                ]
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
        <Chart type="doughnut" data={chartData} options={lightOptions}/>
    )
};    


export default PredictionPie;
