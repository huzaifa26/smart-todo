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
        stepSize:1,
        maxTicksLimit: 24
      },
      position: 'top',
    }
  },
};

export function Timeline() {
  const { data, isLoading, isError, refetch } = useQuery(['timeline_data'], fetchData);
  async function fetchData(e) {
    const response = await axios.get(`${API_URL}tasks/timeline/`);
    return response.data;
  }

  const data1 = {
    labels: data?.labels,
    datasets:data?.timeline
  };
  return (<>{isLoading === false ? <Bar className='w-full' options={options} data={data1} /> : <h1>Loading...</h1>}</>)
}