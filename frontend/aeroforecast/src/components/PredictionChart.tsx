import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { FlightDelay, delayBuckets } from '../interfaces/flight-delay';

type PredictionChartProps = {
    flightDelay: FlightDelay
}
const PredictionChart = (props: PredictionChartProps) => {
    const {flightDelay} = props;
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = "#495057";
        const textColorSecondary = "#495057";
        const data = {
            labels: delayBuckets,
            datasets: [
                {
                    label: 'Predicted Delay Time',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: flightDelay.delayBucketProbabilities.map((prob) => prob*100),
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
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                },
                labels: {
                    render: 'percentage',
                    fontSize: 120000,
                    fontColor: ['black'],
                    precision: 2
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <Chart type="bar" data={chartData} options={chartOptions} />
    )
}

export default PredictionChart;