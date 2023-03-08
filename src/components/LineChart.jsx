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
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10
      }
    }
  };

  function getGradient(ctx,chartArea,scales){
    const grad=ctx.createLinearGradient(chartArea.left,0,chartArea.right,0);
    grad.addColorStop(0,"rgba(255,26,104,1)")
    grad.addColorStop(1,"rgba(75,192,192,1) ")
    return grad
  }

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

  return (
    <div>
      <Line options={options} data={linechartdata} />;
    </div>
  );
}

export default LineChart;