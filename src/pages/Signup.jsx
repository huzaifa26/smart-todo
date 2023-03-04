import React, { useContext } from 'react'
import { useRef,  } from "react";
import { useNavigate } from "react-router";
import { DialogContext } from '../components/constants';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../components/constants';
import { FaUserPlus } from 'react-icons/fa';

export default function Signup() {
  const navigate = useNavigate();
  const { openDialog } = useContext(DialogContext);
  const formRef = useRef();

  const signupFormhandler = (e) => {
    e.preventDefault();

    let data = {
      username: formRef.current.username.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      confirmPassword: formRef.current.confirmPassword.value,
    }

    if (data.password === data.confirmPassword) {
      delete data.confirmPassword;
      mutation.mutate(data);
    } else {
      openDialog({ type: "error", title: "Password doesnot match" })
    }

  }

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${API_URL}users/signup/`, data)
    },
    onSuccess: (data) => {
      openDialog({ type: "success", title: "Signup Successful. Redirecting to login page" })
      setTimeout(() => {
        navigate("/")
      }, 2000)
    },
    onError: (error)=>{
      console.log(error);
      if(error.response.status === 400 ){
        openDialog({ type: "error", title: error.response.data.username })
      }
    }
  })

  return (
    <div style={{backgroundImage:"linear-gradient(to right, #0E123F , rgba(14,18,63,0.8))"}} className='h-screen w-screen flex justify-center items-center bg-[aqua]'>
      <div className="px-6 py-3 rounded min-w-[300px] shadow-lg w-[24.216vw] bg-white">
        <div className="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
          <h2 className="text-[clamp(32px,1.978vw,81px)] font-bold bg-[#0E123F] rounded-full"><FaUserPlus className='text-white m-4'/></h2>
        </div>
        <form ref={formRef} onSubmit={signupFormhandler}>
          {/* <!-- username --> */}
          <div className="flex flex-col my-2">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Username</label>
            <input name="username" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>

          <div className="flex flex-col mt-8">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Email</label>
            <input name="email" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>

          <div className="flex flex-col mt-8">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Password</label>
            <input name="password" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>

          <div className="flex flex-col mt-8">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Confirm Password</label>
            <input name="confirmPassword" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>

          <div className="flex flex-col items-center justify-center my-3">
            <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#0E123F] text-white uppercase font-bold`}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
