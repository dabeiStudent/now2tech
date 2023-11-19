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

const LineChartComponent = props => {
    const options = {
        responsive: true,
        plugins: {
          
          title: {
            display: true,
            text: 'Thống kê doanh thu',
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
        labels: props.monthlyStats.map(stats=> stats.month),
        datasets: [
          {
            label: 'doanh thu',
            data: props.monthlyStats.map(stats=> stats.sales),
            backgroundColor: 'rgb(53, 162, 235)',
            borderColor:  'rgba(53, 162, 235, 0.5)',
            borderWidth: 1,
          }
        ],
      };

    return (
        <div className='chart-component line-chart'>
            <Line data={data} options={options}/>
        </div>
    )
}

export default LineChartComponent