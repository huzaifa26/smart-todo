import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import OpenWeatherHourly from '../components/Weather';

export default function Dashboard() {
  const queryClient = useQueryClient()
  console.log(queryClient.getQueriesData("user"));
  return (
    <div className='flex flex-col h-full gap-3'>
      <div className='flex-1  flex gap-3'>
        <div className='flex-1 bg-white rounded-xl p-2'>
          Weekly Report
        </div>
        <div className='flex-1 bg-white rounded-xl p-2'>
          Daily Report
        </div>
      </div>
      <div className='flex-1 bg-white rounded-xl '>
        <OpenWeatherHourly city={"Abbottabad"}/>
      </div>
    </div>
  )
}
