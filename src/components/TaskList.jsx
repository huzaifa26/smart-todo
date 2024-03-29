import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, DialogContext } from './constants';
import { AiOutlineClockCircle } from "react-icons/ai"
import { formatDateTime, transformDate } from './Utils';
import { RiAlertFill } from "react-icons/ri"

export default function TaskList({ task, openModalHandler, index }) {
  const [localIsMissed, setLocalIsMissed] = useState(task?.isMissed);
  const [localIsCompleted, setLocalIsCompleted] = useState(task?.completed);
  const navigate = useNavigate();
  const { openDialog } = useContext(DialogContext);
  const [disableStart, setDisableStart] = useState(true);
  const [showContextMenu, setContextMenu] = useState(false);

  const [weatherAlert, setWeatherAlert] = useState(false);
  const [weatherAlertMessage, setWeatherAlertMessage] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['weather']);
  }, [])

  const deleteMutation = useMutation({
    mutationFn: () => {
      let user = queryClient.getQueriesData(["user"]);
      return axios.delete(API_URL + "tasks/delete/" + user[0][1].data.id + "/" + task?.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      queryClient.invalidateQueries(['daily-report']);
      openDialog({ type: "success", title: "Task Deleted" });
    },
    onError: (error) => {
      openDialog({ type: "error", title: "Erroe deleting task" });
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => {
      if (task.completed || task.isMissed) return []
      return axios.patch(`${API_URL}tasks/edit/`, data)
    },
    onSuccess: (res) => {
      if (task.completed || task.isMissed) return
      queryClient.invalidateQueries(['tasks']);
      queryClient.invalidateQueries(['daily-report']);
    },
    onError: (error) => {
      if (error.response.data?.non_field_errors) {
        openDialog({ type: "error", title: error.response.data?.non_field_errors[0] })
      }
      if (error.response.data?.title) {
        openDialog({ type: "error", title: error.response.data?.title[0] })
      }
      if (error.response.data?.start_time) {
        openDialog({ type: "error", title: error.response.data?.start_time[0] });
      }
    }
  });

  const buttonHandler = (e, type) => {
    if (localIsCompleted || task?.completed) return
    let data = { ...task };
    data.last_updated = data?.last_updated && transformDate(data?.last_updated);

    if (type === "start") {
      data.started = true;
    }

    if (type === "missed" && data.isMissed !== true && localIsMissed !== true && localIsCompleted === false) {
      setLocalIsMissed(true)
      data.isMissed = true;
    }

    if (type === "complete" && localIsCompleted !== true) {
      setLocalIsCompleted(true);
      data.started = true;
      data.completed = true;
    }

    const isFormEdited = Object.keys(task).some((fieldName, index) => {
      return data[fieldName] !== task[fieldName]
    });

    if (isFormEdited) {
      mutation.mutate(data, type);
    }

    data.start_time = data?.start_time && transformDate(data?.start_time);
    data.end_time = data?.end_time && transformDate(data?.end_time);
    if (e !== null) {
      e.stopPropagation();
    }
  }

  const calculateRemainingTime = () => {
    if (localIsCompleted || task?.completed) return

    if (task?.start_time === null) {
      if (disableStart === true) {
        setDisableStart(false);
      }
      if (task?.start_time === null && task?.end_time === null) {
        return 0
      }
    };

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
        let hour = dt.getHours();
        for (let i = 0; i < weather?.length; i++) {
          let d = new Date(weather[i].actualTime)
          let dHour = d.getUTCHours();

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

    const now = new Date().getTime();
    let startTime = task?.start_time?.replace("Z", "");
    startTime = new Date(startTime).getTime();
    const starttimeDiff = startTime - now;

    let endTime = task?.end_time?.replace("Z", "");
    endTime = new Date(endTime).getTime();
    const endtimeDiff = now - endTime;


    if (starttimeDiff <= 0 && disableStart === true) {
      setDisableStart(false);
    }

    if (endtimeDiff > 0 && task?.started && task?.completed === false) {
      buttonHandler(null, "complete");
    }

    if (endtimeDiff > 0 && task?.started === false && task.isMissed === false && task?.completed === false) {
      buttonHandler(null, "missed");
    }

    return Math.max(starttimeDiff, 0);
  }

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [setRemainingTime, task?.start_time, task?.end_Time]);

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  useEffect(() => {
    // Attach event listener to document
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = () => {
    setContextMenu(false);
  }

  return (
    <div onClick={() => openModalHandler(task)} key={task?.id} style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.1)" }} className='h-[80px] rounded-lg p-2 px-4 w-[100%] flex justify-between items-center transition-transform cursor-pointer relative bg-[white]'>
      <div className='flex-1'>
        <h2 className='text-lg font-bold'>{task.title}</h2>
        <p className="truncate w-[90%] text-sm">{task.description}</p>
      </div>
      <div className='flex items-center gap-2 relative'>
        {weatherAlert && <div className='titleDiv' onClick={(e) => e.stopPropagation()} data-title={weatherAlertMessage} key={weatherAlertMessage}><RiAlertFill className='text-[#ff7b7b] mr-[10px] text-xl' /></div>}
        {task?.started === false && task?.isMissed === false && task?.completed === false && disableStart === false ?
          <button onClick={(e) => buttonHandler(e, 'start')} disabled={disableStart} style={disableStart ? { opacity: "0.5", cursor: "not-allowed" } : {}} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-24 h-10 transition-colors'>Start</button>
          : disableStart && !task.completed ?
            <div className='flex items-center gap-[5px]'>
              <AiOutlineClockCircle />
              <p>{`${days !== 0 ? days + "d," : ""} ${hours !== 0 ? hours + "h," : ""} ${minutes !== 0 ? minutes + "m," : ""} ${seconds !== 0 ? seconds + "s" : ""}`}</p>
            </div> : null
        }
        {task?.started === true && task.completed === false &&
          <button onClick={(e) => { buttonHandler(e, 'complete'); e.stopPropagation(); }} disabled={disableStart} style={disableStart ? { opacity: "0.5", cursor: "not-allowed" } : {}} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'>Mark as complete</button>
        }
        {task?.isMissed === true && task?.completed === false &&
          <button onClick={(e) => e.stopPropagation()} disabled={disableStart} style={task?.isMissed ? { opacity: "0.5" } : {}} className='m-2 bg-[#0E123F] text-white rounded-lg w-24 h-10 transition-colors cursor-default'>Missed</button>
        }
        {task.completed &&
          <button disabled style={{ opacity: "0.5", cursor: "not-allowed" }} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'>Completed</button>
        }
        <div onClick={(e) => { setContextMenu(!showContextMenu); e.stopPropagation(); }} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center'>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
        </div>
        <ul style={showContextMenu === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='transition-all absolute z-10 right-0 top-[50px] bg-[white] shadow-md flex flex-col divide-y-2'>
          <li style={task?.started && task?.completed ? { opacity: "0.5", cursor: "not-allowed" } : {}} onClick={(e) => { if (!task?.started && !task?.completed) { navigate("/home/edit-task", { state: { task } }) }; e.stopPropagation(); }} className='py-2 px-6 flex-1 flex justify-center select-none items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Edit</li>
          <li style={task?.completed ? { opacity: "0.5", cursor: "not-allowed" } : {}} onClick={(e) => { buttonHandler(null, "complete"); e.stopPropagation(); }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none  '>Complete</li>
          <li onClick={(e) => { deleteMutation.mutate(); setContextMenu(false); e.stopPropagation(); }} className='py-2 px-6 flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none  '>Delete</li>
        </ul>
      </div>
    </div>
  )
}
