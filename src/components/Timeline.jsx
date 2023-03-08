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
import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from './constants';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: true,
      text: 'Weekly Overview of tasks',
    },
  },
  scales: {
    x: {
      min: 0,
      max: 24,
      ticks: {
        stepSize: 1,
      },
      position: 'top',
    }
  },

};

const labels = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export function Timeline() {
  const { data, isLoading, isError, refetch } = useQuery(['timeline_data'], fetchData);
  async function fetchData(e) {
    const response = await axios.get(`${API_URL}tasks/timeline/`);
    console.log(response);
    return response.data;
  }
  // console.log(data);
  // let label=[]
  // data.forEach((d,index)=>{
  //   label.push(d[0])
  //   console.log(d[0]?.start_time.split("T")[0]);
  // })
  // console.log(label);

  console.log(data);

  const data1 = {
    labels: data?.labels,
    datasets: [
      // {
      //   label: "Sat",
      //   data: [[0,1],[0,0],[0,1],[0,1],[11.47,17.47],[11.47,17.47],[11.47,17.47]],
      //   borderColor: "#AF91E9",
      //   backgroundColor: "#AF91E9"
      // },
      // {
      //   label: "Sat",
      //   data: [[11.47,17.47],[11.47,17.47],[11.47,17.47]],
      //   borderColor: "#AF91E9",
      //   backgroundColor: "#AF91E9"
      // },
      // {
      //   label: "Sat",
      //   data: [[11.47,17.47],[11.47,17.47],[11.47,17.47]],
      //   borderColor: "#AF91E9",
      //   backgroundColor: "#AF91E9"
      // }
            {
                "label": "Todo Tasks",
                "data": [[2,4], 8, 6, 7, 3, 5, 2],
                "backgroundColor": "rgba(54, 162, 235, 0.2)",
                "borderColor": "rgba(54, 162, 235, 1)",
                "borderWidth": 1
            },
            {
                "label": "Todo Tasks",
                "data": [[6,4], 8, 0, 7, 3, 5, 0],
                "backgroundColor": "rgba(54, 162, 235, 0.2)",
                "borderColor": "rgba(54, 162, 235, 1)",
                "borderWidth": 1
            }
    ],
  };
  return <Bar options={options} data={data1} />;
}
