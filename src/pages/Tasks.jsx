import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../components/constants';
import axios from 'axios';
import TaskList from '../components/TaskList';
import { MdAddTask } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';

export default function Tasks() {
  const formatDate = (date) => {
    let newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(formatDate(new Date()));
  const { data, isLoading, isError, refetch } = useQuery(['tasks', date], fetchData);
  const [detailModal,setDetailModal]=useState(false);
  const [task,setTask]=useState(null);

  const openModalHandler=(task)=>{
    setTask(task);
    setDetailModal(true);
  }
  const closeModalHandler=()=>{
    setDetailModal(false);
  }

  async function fetchData(e) {
    const response = await axios.post(`${API_URL}tasks/get/`, { user: 4, date: date });
    return response.data;
  }

  const onChangeHandler = (e) => {
    const formattedDate = formatDate(e);
    setDate(formattedDate);
    onChange(e);
  }

  console.log(data);

  return (
    <>
    {/* {detailModal &&  */}
      <TaskDetail detailModal={detailModal} task={task} closeModalHandler={closeModalHandler}/>
    {/* }  */}
      <div className='flex flex-row h-full gap-3'>
        <div className='flex-1 bg-white rounded-xl p-2 divide-y-2'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold p-2'>Tasks</h1>
            <button onClick={() => navigate("/home/add-task")} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'><MdAddTask className='inline text-2xl mr-2' />Add Task</button>
          </div>
          <div className='p-2 pt-4 mt-2 space-y-5 overflow-auto max-h-[80vh] h-full'>
            {isLoading ? <h1>Loading...</h1> : data.length > 0 ? data?.map((task, index) => {
              return <TaskList openModalHandler={openModalHandler} task={task} />
            }) : <h1 className='text-lg font-[400]'>No tasks for today.</h1>}
          </div>
        </div>
        <div className='w-[30%] max-h-[420px] bg-white rounded-xl p-2 pt-4 divide-y-2'>
          <h1 className='text-lg font-bold mt-2 ml-2'>Choose Date:</h1>
          <Calendar onChange={(e) => onChangeHandler(e)} value={value} className=" mt-4" />
        </div>
      </div>
    </>
  )
}
