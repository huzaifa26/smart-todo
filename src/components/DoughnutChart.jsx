import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ data }) {
  const doughnutdata = {
    labels: ['Total Tasks', 'Completed Tasks', 'Started Tasks'],
    datasets: [
      {
        data: [data?.task_count, data?.completed_count, data?.started_count],
        backgroundColor: ['#0E123F', '#AF91E9', '#eaeffc'],
        hoverBackgroundColor: ['#0E123F99', '#AF91E999', '#eaeffc90'],
        borderWidth: 0,
      }
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const options = {
    maintainAspectRatio: false
  };

  return (
    <>
      {data?.task_count || data?.completed_count || data?.started_count?
        <Doughnut data={doughnutdata} options={options} />:
        <p className='text-center text-xl'>No data to show for today</p>
      }
    </>

  )
}
