import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import DoughnutChart from '../components/DoughnutChart';
import OpenWeatherHourly from '../components/Weather';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '../components/Utils';
import axios from 'axios';
import { API_URL } from '../components/constants';
import LineChart from '../components/LineChart';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery(['daily-report'], fetchData);
  async function fetchData(e) {
    let user = queryClient.getQueryData(['user']);
    let date = formatDate();
    date = date.split(" ")[0]
    const response = await axios.get("http://127.0.0.1:8000/tasks/count/" + user.data.id + "/" + date + "/");
    return response.data;
  }

  return (
    <div className='flex flex-col h-full gap-3'>
      <div className='flex-1 bg-white rounded-xl max-h-[400px] flex justify-center items-center'>
        {isLoading ? <img className='w-[50px] m-auto' src='/Loading.svg' /> :
          <LineChart data={data?.month_count} />
        }
      </div>
      <div className='flex-1  flex gap-3'>
        <div className='flex-1 bg-white rounded-xl p-2'>
          <OpenWeatherHourly city={"Far Northwest, Columbus, OH, USA"} />
        </div>
        <div className='flex-1 bg-white rounded-xl p-2 flex justify-center items-center'>
          {isLoading ? <img className='w-[50px] m-auto' src='/Loading.svg' /> :
            <DoughnutChart data={data} />
          }
        </div>
      </div>
    </div>
  )
}
