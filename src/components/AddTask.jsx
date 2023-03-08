import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from "react-icons/ai"
import { useMutation } from '@tanstack/react-query';
import { API_URL, DialogContext } from './constants';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { MdOutlineSubtitles } from "react-icons/md"
import { MdOutlineDescription } from "react-icons/md"
import { BiCategoryAlt } from "react-icons/bi"
import { AiOutlineFieldTime } from "react-icons/ai"
import { formatDate } from './Utils';


export default function AddTask() {
  const queryClient = useQueryClient();

  const { openDialog } = useContext(DialogContext);
  const navigate = useNavigate();
  const formRef = useRef();

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return axios.post(`${API_URL}tasks/add/`, data)
    },
    onSuccess: () => {
      openDialog({ type: "success", title: "Task added succesfully" })
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

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let user = queryClient.getQueriesData(["user"]);
    const added_date=formatDate();
    let data = {
      user: user[0][1].data.id,
      title: formRef.current.title.value,
      description: formRef.current.description.value,
      category: formRef.current.category.value,
      start_time: formRef.current.start_time.value.split("T").join(" ") + ":00",
      end_time: formRef.current.end_time.value.split("T").join(" ") + ":00",
      added_date:added_date,
    }
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <div className='h-full bg-white rounded-xl p-2 divide-y-2'>
      <div className='flex justify-between items-center w-[100%]'>
        <h1 className='text-2xl font-bold p-2'>Add Task</h1>
        <button onClick={() => navigate(-1)} className='m-2 bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-32 h-10 flex items-center justify-center'><AiOutlineLeft className='inline text-lg mr-[5px]' />Back</button>
      </div>
      <div>
        <form ref={formRef} onSubmit={formSubmitHandler} className='flex flex-col gap-3 w-[40%] mt-8 p-2'>
          <div className='border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative'>
            <MdOutlineSubtitles className='ml-2 absolute' />
            <input className='flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]' type={"text"} name='title' placeholder='Title'></input>
          </div>
          <div className='border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex relative'>
            <MdOutlineDescription className='ml-2 mt-3 absolute' />
            <textarea className='flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]' rows={5} name='description' placeholder='Description'></textarea>
          </div>
          <div className='border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex relative'>
            <BiCategoryAlt className='ml-2 mt-3 absolute' />
            <select name='category' className='flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]'>
              <option value={"sport"}>Sport</option>
              <option value={"gaming"}>Gaming</option>
              <option value={"study"}>Study</option>
            </select>
          </div>
          <div className='border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex relative'>
            <AiOutlineFieldTime className='ml-2 mt-3 absolute' />
            <input name='start_time' onFocus={(e) => { e.target.type = "datetime-local";e.target.style.textIndent="16px" }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text";e.target.style.textIndent="24px" }; }} className='indent-6 flex-1 rounded-lg p-2 outline-none focus:border-[#AF91E9] min-h-[42px]' type={"text"} placeholder="Enter Start date and time" />
          </div>
          <div className='border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex relative'>
            <AiOutlineFieldTime className='ml-2 mt-3 absolute' />
            <input name='end_time' onFocus={(e) => { e.target.type = "datetime-local";e.target.style.textIndent="16px" }} onBlur={(e) => { if (e.target.value === "") { e.target.type = "text";e.target.style.textIndent="24px" }}} className='indent-6 flex-1 rounded-lg p-2 outline-none focus:border-[#AF91E9] min-h-[42px]' type={"text"} placeholder="Enter End date and time" />
          </div>
          <button type='submit' className='bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-32 h-10'>Submit</button>
        </form>
      </div>
    </div>
  )
}
