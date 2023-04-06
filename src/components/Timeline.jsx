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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from './constants';
import axios from 'axios';
import { transformLabelDate } from './Utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
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
        maxTicksLimit: 24,
        callback: function (value) {
          const hour = value % 12 || 12;
          const ampm = value < 12 ? 'AM' : 'PM';
          return `${hour} ${ampm}`;
        },
      },
      position: 'top',
    },
  },
};


export function Timeline() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"])
  const { data, isLoading, isError, refetch } = useQuery(['timeline_data'], fetchData);
  async function fetchData(e) {
    const response = await axios.get(API_URL + 'tasks/timeline/' + user.data.id);
    let labels=[]
    response?.data?.labels?.forEach((date)=>{
      labels.push(transformLabelDate(date))
    })
    response.data.labels=labels
    return response.data;
  }

  const data1 = {
    labels: data?.labels,
    datasets: data?.timeline
  };
  return (<>{isLoading === false ? <Bar className='w-full' options={options} data={data1} /> : <h1>Loading...</h1>}</>)
}