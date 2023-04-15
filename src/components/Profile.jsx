import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlinePerson, MdOutlinePhone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { API_URL, DialogContext } from './constants';
import axios from 'axios';

export default function Profile() {
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
      return axios.put(`${API_URL}users/update/`, data)
    },
    onSuccess: (res) => {
      openDialog({ type: "success", title: "User updated succesfully" });
      let d=localStorage.getItem("user")
      d=JSON.parse(d)
      d.data=res.data
      queryClient.setQueryData(['user'],d);
      localStorage.setItem("user", JSON.stringify(d));
    },
    onError: (error) => {
      openDialog({ type: "error", title: "Error updating user" });
    }
  })


  const formSubmitHandler = (e) => {
    e.preventDefault();
    let data={
      id:user.id,
      username:formRef.current.username.value,
      email:formRef.current.email.value,
      first_name:formRef.current.first_name.value,
      last_name:formRef.current.last_name.value,
      // password:formRef.current.password.value,
      // confirmPassword:formRef.current.confirmPassword.value,
    }
    mutation.mutate(data);
  }

  return (
    <div className="bg-white rounded-xl p-2 h-[80vh]">
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-2xl font-bold">Update Your Information</h1>
      </div>
      <div>
        <form ref={formRef} onSubmit={formSubmitHandler} className="flex flex-col gap-3 w-[40%] mt-4 p-2">
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlinePerson className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="username"
              placeholder="Username"
              defaultValue={user?.username}
            />
          </div>
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlineEmail className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="email"
              placeholder="Email Address"
              defaultValue={user?.email}
            />
          </div>
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlinePerson className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="first_name"
              placeholder="First Name"
              defaultValue={user?.first_name || null}
            />
          </div>
          <div className="border-[2px] border-[rgba(0,0,0,0.2)] rounded-lg flex items-center relative">
            <MdOutlinePerson className="ml-2 absolute" />
            <input
              className="flex-1 indent-6 rounded-lg p-2 outline-none focus:border-[#AF91E9]"
              type={"text"}
              name="last_name"
              placeholder="Last Name"
              defaultValue={user?.last_name || null}
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
