import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import './ChartComponent.css';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );

const ChartComponent = props => {
  const data = {
    labels: props.orderStats.labels,
    datasets: [
      {
        label: '% đơn hàng',
        data: props.orderStats.datasets,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Thống kê đơn hàng',
      },
    },
    };

    return(
        <div className='chart-component pie-chart'>
            <Pie data={data} options={options} />
        </div>
        )
};

export default ChartComponent;
