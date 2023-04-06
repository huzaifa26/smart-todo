import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../components/constants';
import axios from 'axios';
import TaskList from '../components/TaskList';
import { MdAddTask } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';
import { Timeline } from '../components/Timeline';
import { MdOutlineSummarize } from "react-icons/md"
import { timeConvert } from '../components/Utils';

export default function Tasks() {
  const queryClient = useQueryClient();

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
  const [detailModal, setDetailModal] = useState(false);
  const [task, setTask] = useState(null);
  const [showOverView, setShowOverView] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(['tasks', date], fetchData);

  const openModalHandler = (task) => {
    setTask(task);
    setDetailModal(true);
  }
  const closeModalHandler = () => {
    setDetailModal(false);
  }

  async function fetchData(e) {
    let user = queryClient.getQueryData(['user']);
    const response = await axios.post(`${API_URL}tasks/get/`, { user: user.data.id, date: date });
    return response?.data;
  }


  const onChangeHandler = (e) => {
    const formattedDate = formatDate(e);
    refetch(formattedDate);
    setDate(formattedDate);
    onChange(e);
  }

  const totalTimeQuery = useQuery(['totalTime'], fetchTotalTime);

  async function fetchTotalTime(e) {
    let user = queryClient.getQueryData(['user']);
    const response = await axios.get(API_URL + 'tasks/getTotalTime/' + user.data.id);
    return response?.data;
  }

  return (
    <>
      {detailModal &&
        <TaskDetail detailModal={detailModal} task={task} closeModalHandler={closeModalHandler} refetch={refetch} />
      }
      <div className='flex flex-row h-full gap-3'>
        <div style={showOverView ? { width: "100%", } : { width: "70%" }} className='bg-white transition-all delay-100 duration-150 rounded-xl p-2 divide-y-2 w-[70%]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold p-2'>Tasks</h1>
            <div>
              <button onClick={() => setShowOverView(!showOverView)} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'><MdOutlineSummarize className='inline text-2xl mr-2' />{showOverView ? "Hide Overview" : "Show Overview"}</button>
              <button onClick={() => navigate("/home/add-task")} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-40 h-10 transition-colors'><MdAddTask className='inline text-2xl mr-2' />Add Task</button>
            </div>
          </div>
          <div className='p-2 pt-4 mt-2 space-y-5 overflow-auto max-h-[80vh] h-full'>
            {showOverView ? <Timeline /> : isLoading ? <img className='w-[50px] m-auto pt-4' src='/Loading.svg' /> : data?.length > 0 ? data?.map((task, index) => {
              return <TaskList openModalHandler={openModalHandler} key={task.id} task={task} index={index} />
            }) : <h1 className='text-lg font-[400]'>No tasks for today.</h1>}

          </div>
        </div>
        {!showOverView &&
          <div style={showOverView ? { maxWidth: "0px", transform: "scale(0)" } : { maxWidth: "30%", transform: "scale(1)" }} className='transition-all delay-75 max-h-[480px] bg-white rounded-xl p-2 pt-4 divide-y-2'>
            <h1 className='text-lg font-bold mt-2 ml-2'>Select Date to see tasks:</h1>
            <Calendar onChange={(e) => onChangeHandler(e)} value={value} className=" mt-4" />
            <div className='flex flex-col justify-center h-[70px] pl-2'>
              <p className='font-[600]'>Total Time for today:</p>
              {!totalTimeQuery.isLoading &&
                <p>{timeConvert(totalTimeQuery?.data?.today_total_time)}</p>
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}
