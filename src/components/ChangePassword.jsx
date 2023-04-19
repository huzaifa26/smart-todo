import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlinePerson, MdOutlinePhone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { API_URL, DialogContext } from './constants';
import axios from 'axios';

export default function ChangePassword() {
  const navigate = useNavigate();
  const formRef = useRef();
  const queryClient = useQueryClient();
  const { openDialog } = useContext(DialogContext);

  const [user, setUser] = useState(queryClient.getQueryData(["user"])?.data);

  useEffect(() => {
    setUser(queryClient.getQueryData(["user"])?.data);
  }, [queryClient])

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.put(`${API_URL}users/change-password/`, data);
    },
    onSuccess: (res) => {
      openDialog({ type: "success", title: "Password updated succesfully" });
    },
    onError: (error) => {
      console.log(error)
      openDialog({ type: "error", title: error?.response?.data?.error[0] || "Error changing password" });
    }
  })

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(formRef.current.confirmPassword.value !== formRef.current.newPassword.value){
      openDialog({type:"error",title:"Passwords doesnot match"});
      return
    }
    let data={
      id:user.id,
      old_password:formRef.current.oldPassword.value,
      new_password:formRef.current.newPassword.value,
    }
    mutation.mutate(data);
  }

  return (
    <div className="bg-white rounded-xl p-2 h-[80vh]">
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-2xl font-bold">Change Password</h1>
      </div>
      <div>
        <form ref={formRef} onSubmit={formSubmitHandler} className="flex flex-col gap-3 w-[40%] mt-4 p-2">
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlinePerson className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="oldPassword"
              placeholder="Old Password"
            />
          </div>
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlinePerson className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="newPassword"
              placeholder="New Password"
            />
          </div>
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlinePerson className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>

          {!mutation.isLoading ?
          <button type='submit' className='bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-32 h-10'>Update</button>
          :
          <button type='button' className='bg-[#0E123F] hover:bg-[#AF91E9] text-white rounded-lg w-32 h-10'><img className='w-[30px] m-auto' src='/WhiteLoading.svg'/></button>
        }
        </form>
      </div>
    </div>
  )
}
