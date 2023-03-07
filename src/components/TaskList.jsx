import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function TaskList({ task, openModalHandler }) {
  const navigate=useNavigate();

  const [disableStart, setDisableStart] = useState(true);
  const [showContextMenu,setContextMenu]=useState(false);

  const transformDate = (data) => {
    const date = new Date(task.added_date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

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

  return (
    <div onClick={() => openModalHandler(task)} key={task.id} style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.1)" }} className='h-[80px] rounded-lg p-2 px-4 w-full flex justify-between items-center hover:scale-[1.01] transition-transform cursor-pointer relative z-0'>
      <div>
        <h2 className='text-lg font-bold'>{task.title}</h2>
        <p class="truncate w-[38vw] text-sm">{task.description}</p>
      </div>
      <div className='flex items-center gap-2 relative'>
        <button disabled={disableStart} style={disableStart ? { opacity: "0.5", cursor: "not-allowed" } : {}} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-24 h-10 transition-colors' onClick={(event) => { alert(1); event.stopPropagation(); }}>Start</button>
        <div onClick={(e)=>{setContextMenu(!showContextMenu);e.stopPropagation();}} className='relative flex flex-col gap-[5px] w-[40px] h-[40px] hover:bg-[rgba(0,0,0,0.05)] rounded-full justify-center items-center'>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
          <div className='w-[5px] h-[5px] bg-black rounded-full'></div>
        </div>
        <ul style={showContextMenu===true?{transform:"scale(1)",opacity:"1"}:{transform:"scale(0)",opacity:"0"}} className='transition-all absolute z-[1000] right-0 top-[50px] bg-[white] shadow-md w-[100px] h-24 flex flex-col divide-y-2'>
          <li onClick={()=>{navigate("/home/edit-task",{state:{task}})}} className='flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Edit</li>
          <li className='flex-1 flex justify-center items-center hover:bg-[rgba(0,0,0,0.05)] transition-colors'>Delete</li>
        </ul>
      </div>
    </div>
  )
}
