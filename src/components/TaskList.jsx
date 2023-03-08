import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, DialogContext } from './constants';

export default function TaskList({ task, openModalHandler, index }) {
  const navigate = useNavigate();
  const { openDialog } = useContext(DialogContext);
  const [disableStart, setDisableStart] = useState(true);
  const [showContextMenu, setContextMenu] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.patch(`${API_URL}tasks/edit/`, data)
    },
    onSuccess: () => {
      openDialog({ type: "success", title: "Task Edited succesfully" })
      // refetch()
      queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {
      console.log(error);
      if (error.response.data?.non_field_errors) {
        openDialog({ type: "error", title: error.response.data?.non_field_errors[0] })
      }
      if (error.response.data?.title) {
        openDialog({ type: "error", title: error.response.data?.title[0] })
      }
      if (error.response.data?.start_time) {
        openDialog({ type: "error", title: error.response.data?.start_time[0] })
      }
    }
  })


  const calculateRemainingTime = () => {
    let startTime = task?.start_time.replace("Z", "");
    startTime = new Date(startTime).getTime();
    let endTime = task?.end_time.replace("Z", "");
    endTime = new Date(endTime).getTime();
    const now = new Date().getTime();
    const starttimeDiff = startTime - now;
    const endtimeDiff = now - endTime;

    if (starttimeDiff <= 0 && disableStart === true) {
      setDisableStart(false);
    }
    if (endtimeDiff >= 0 && disableStart === false) {
      setDisableStart(true);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);
    return () => clearInterval(interval);
  });

  const buttonHandler = (e,type) => {
    let data = { ...task };
    if(type === "start"){
      data.started = true;
    }
    if(type === "complete"){
      data.completed = true;
    }
    console.log(data)
    mutation.mutate(data);
    e.stopPropagation();
  }


  return (
    <div onClick={() => openModalHandler(task)} key={task.id} style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.1)" }} className='h-[80px] rounded-lg p-2 px-4 w-full flex justify-between items-center transition-transform cursor-pointer relative bg-[white]'>
      <div>
        <h2 className='text-lg font-bold'>{task.title}</h2>
        <p class="truncate w-[38vw] text-sm">{task.description}</p>
      </div>
      <div className='flex items-center gap-2 relative'>
        {task?.started === false &&
          <button onClick={(e)=>buttonHandler(e,'start')} disabled={disableStart} style={disableStart ? { opacity: "0.5", cursor: "not-allowed" } : {}} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-24 h-10 transition-colors'>Start</button>
        }
        {task?.started === true && task.completed === false &&
          <button onClick={(e)=>buttonHandler(e,'complete')} disabled={disableStart} style={disableStart ? { opacity: "0.5", cursor: "not-allowed" } : {}} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'>Mark as complete</button>
        }
        {task?.started === true && task.completed &&
          <button disabled style={{ opacity: "0.5", cursor: "not-allowed" }} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'>Completed</button>
        }
        <div onClick={(e) => { setContextMenu(!showContextMenu); e.stopPropagation(); }} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center'>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
        </div>
        <ul style={showContextMenu === true ? { transform: "scale(1)", opacity: "1" } : { transform: "scale(0)", opacity: "0" }} className='transition-all absolute z-10 right-0 top-[50px] bg-[white] shadow-md w-[100px] h-24 flex flex-col divide-y-2'>
          <li style={task?.started && task?.completed?{opacity: "0.5",cursor: "not-allowed"}:{}} onClick={(e) => {console.log(!task?.started && !task?.completed);if(!task?.started && !task?.completed) {navigate("/home/edit-task", { state: { task } })};e.stopPropagation(); }} className='flex-1 flex justify-center select-none items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Edit</li>
          <li className='flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors select-none  '>Delete</li>
        </ul>
      </div>
    </div>
  )
}
