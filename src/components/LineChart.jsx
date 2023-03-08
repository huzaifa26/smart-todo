import React from 'react';
import { Line } from 'react-chartjs-2';
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
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);





function LineChart({ data }) {

  const labels = data?.map((item) => item.day);
  const tasksPerDay = data?.map((item) => item.total);

  console.log(tasksPerDay);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Past 7 days report',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 15
      }
    }
  };

  const linechartdata = {
    labels,
    datasets: [
      {
        label: 'Tasks',
        data: tasksPerDay,
        borderColor: '#AF91E9',
        backgroundColor: '#0E123F',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  console.log(linechartdata);

  return (
    <div>
      <Line options={options} data={linechartdata} />;
    </div>
  );
}

export default LineChart;