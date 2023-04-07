import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDateTime } from './Utils';
import { RiAlertFill } from 'react-icons/ri';


export default function TaskDetail({ closeModalHandler, task, detailModal }) {
  const queryClient = useQueryClient()
  const [weatherAlert, setWeatherAlert] = useState(false);
  const [weatherAlertMessage, setWeatherAlertMessage] = useState(false);
  const calculateRemainingTime = () => {

    if (task?.start_time !== null && task?.end_time !== null && task?.activity_type === "outdoors" && task?.started === false) {
      let weather = queryClient.getQueryData(['weather']);
      if (weather === undefined) {
        weather = localStorage.getItem('weather');
        weather = JSON.parse(weather);
      }

      let st = task?.start_time.replace("Z", "")
      const remainingTime = new Date(st).getTime() - new Date().getTime();

      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));

      if (remainingHours <= 5 && remainingHours >= 0) {
        let dt = new Date(task?.start_time);

        let hour = dt.getUTCHours();
        for (let i = 0; i < weather?.length; i++) {
          let d = new Date(weather[i].actualTime)
          let dHour = d.getHours();
          if (hour === dHour) {
            if (weather[i].precip_prob > 49 && weatherAlert === false) {
              setWeatherAlert(true);
              setWeatherAlertMessage(`Task detected as outdoors, it is likely to ${weather[i].weather} at the time ${formatDateTime(task?.start_time)} for task.`);
            } else if (weather[i].precip_prob < 50 && weatherAlert === true) {
              setWeatherAlert(false);
            }
          }
        }
      }
    }

    if (!task?.started && task?.start_time !== null) {
      let startTime = task?.start_time.replace("Z", "");
      startTime = new Date(startTime).getTime()
      const now = new Date().getTime();
      const timeDiff = startTime - now;
      return Math.max(timeDiff, 0);
    }
    if (task?.started && !task?.completed && task?.end_time !== null) {
      let endTime = task?.end_time.replace("Z", "");
      endTime = new Date(endTime).getTime()
      const now = new Date().getTime();
      const timeDiff = endTime - now;
      return Math.max(timeDiff, 0);
    }
    return 0;
  }
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  });


  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <div style={detailModal === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='w-[100vw] transition-opacity duration-150 absolute z-20 top-0 left-0 bg-[rgba(0,0,0,0.25)] backdrop-blur-sm h-[100vh] flex justify-center items-center'>
      <div style={detailModal === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='w-[70%] transition-opacity duration-150 h-[80%] bg-white rounded-lg p-4 divide-y-2 space-y-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold p-2'>Tasks</h1>
          <RxCross2 onClick={closeModalHandler} className='text-4xl cursor-pointer' />
        </div>
        <div className='p-2 space-y-2 pt-4'>
          <h2><span className='text-lg font-bold'>Title: </span>{task?.title}</h2>
          <h2><span className='text-lg font-bold'>Description: </span>{task?.description}</h2>
          <h2><span className='text-lg font-bold'>Category: </span>{task?.category}</h2>
          {task?.activity_type && <h2><span className='text-lg font-bold'>Activity Type: </span>{task?.activity_type}</h2>}
          {/* <h2><span className='text-lg font-bold'>Added Date: </span>{formatDateTime(task?.added_date)}</h2> */}
          <h2><span className='text-lg font-bold'>Start Time: </span>{formatDateTime(task?.start_time)}</h2>
          <h2><span className='text-lg font-bold'>End Time: </span>{formatDateTime(task?.end_time)}</h2>
          <h2><span className='text-lg font-bold'>Last Updated: </span>{formatDateTime(task?.last_updated)}</h2>
          <h2><span className='text-lg font-bold'>Status: </span>{task?.completed ? "Completed" : task?.started ? "Active" : !task?.completed && !task?.isMissed && remainingTime === 0 ? "Available to start" : task?.isMissed ? "Missed" : "Upcomming"}</h2>
          {!task?.started && !task.completed && !task.isMissed ?
            <h2><span className='text-lg font-bold'>Starts in: </span>{`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}</h2>
            : null
          }
          {task?.started && !task?.completed &&
            <h2><span className='text-lg font-bold'>Ends in: </span>{`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}</h2>
          }

          {weatherAlert &&
            <h2><span className='text-lg font-bold'>Tip: </span>{weatherAlertMessage}</h2>

          }

        </div>
      </div>
    </div>
  )
}
