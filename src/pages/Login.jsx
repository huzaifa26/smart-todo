import React from 'react'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../components/constants';
import { FaUserAlt } from "react-icons/fa";
import { useContext } from 'react';
import { DialogContext } from '../components/constants';


export default function Login() {
  const { openDialog } = useContext(DialogContext);
  const navigate = useNavigate();
  const formRef = useRef();
  const [rememberMe, setRememberMe] = useState(false);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${API_URL}users/login/`, data)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      openDialog({ type: "success", title: "Login Successfull" });
      queryClient.invalidateQueries(['totalTime']);
      navigate("/home/dashboard");
    },
    onError: (error) => {
      openDialog({ type: "error", title: error.response.data?.non_field_errors[0] });
    }
  })

  const loginFormHandler = (e) => {
    e.preventDefault();
    let data = {
      username: formRef.current.username.value,
      password: formRef.current.password.value,
    }
    loginMutation.mutate(data);
  }


  return (
    <div style={{ backgroundImage: "linear-gradient(to right, #0E123F , rgba(14,18,63,0.8))" }} className='h-screen w-screen flex justify-center items-center'>
      <div className="px-6 py-3 rounded min-w-[300px] shadow-lg w-[21.216vw] bg-white">
        <div className="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
          <h2 className="text-[clamp(32px,1.978vw,81px)] font-bold bg-[#0E123F] rounded-full"><FaUserAlt className='text-white m-4' /></h2>
        </div>
        <form ref={formRef} onSubmit={loginFormHandler}>
          {/* <!-- username --> */}
          <div className="flex flex-col my-2">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Username</label>
            <input name="username" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>
          <div className="flex flex-col mt-10">
            <label className="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Password</label>
            <input name="password" className="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>
          <div className="flex flex-col items-center justify-center my-3">
            {/* <div className="flex w-full items-center justify-between text-xs text-gray-500">
              <label className="flex items-center justify-center text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold"><input onChange={(e) => setRememberMe(!rememberMe)} type={"checkbox"} /> Remember me.</label>
              <Link to="findUser">
                <p className="text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold">Forgot password?</p>
              </Link>
            </div> */}
            {loginMutation.isLoading === false &&
              <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[11.258vw] hover:bg-[#AF91E9] text-[clamp(14px,0.801vw,32.82px)] bg-[#0E123F] text-white uppercase font-bold`}>
                Login
              </button>
            }
            {loginMutation.isLoading &&
              <button className={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[11.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#0E123F] text-white uppercase font-bold`}>
                <img className='w-[20px] m-auto' src='/WhiteLoading.svg' />
              </button>
            }
            <Link to={"/signup"}>
              <button className="mb-[4.443vh] hover:bg-[#0E123F] hover:text-white min-w-[150px] min-h-[30px] h-[4.3518518518519vh] my-1 rounded-full py-1 w-[11.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-white border-2 border-[#0E123F] text-[#0E123F] font-bold uppercase">
                Signup
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
