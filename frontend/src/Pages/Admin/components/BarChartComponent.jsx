import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import './BarChartComponent.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = props => { 
  
  const options = {
      plugins: {
        title: {
          display: true,
          text: 'Thống kê người dùng',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        },
      },
  };

  const labels = props.monthlyStats.map(stats=> stats.month);
  const data = {
      labels,
      datasets: [
        {
          label: 'người dùng mới',
          data: props.monthlyStats.map(stats=> Number(stats.userNum)),
          backgroundColor: 'rgb(255, 99, 132)',
        }
      ],
    };

  return (
    <div className='chart-component bar-chart'>
        <Bar options={options} data={data}/>
    </div>
  )
}

export default BarChartComponent