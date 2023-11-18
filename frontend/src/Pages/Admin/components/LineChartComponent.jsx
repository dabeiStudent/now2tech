import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import './LineChartComponent.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChartComponent = () => {
    const options = {
        responsive: true,
        plugins: {
          
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        scales: {
            x: {
              beginAtZero: true,
              grid: {
                  display: false,
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                  display: false
              }
            },
          },
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40, 100, 30, 90, 80, 90],
            backgroundColor: 'rgb(53, 162, 235)',
            borderColor:  'rgba(53, 162, 235, 0.5)',
            borderWidth: 1,
          },
          {
            label: 'Dataset 2',
            data: [35, 80, 30, 30, 40, 90, 100, 70, 80, 80],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
          },
        ],
      };

    return (
        <div className='chart-component'>
            <Line data={data} options={options}/>
        </div>
    )
}

export default LineChartComponent