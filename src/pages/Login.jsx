import React from 'react'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PRIMARY } from './components/constants';

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [rememberMe, setRememberMe] = useState(false);

  const loginFormHandler = (e) => {
    e.preventDefault();
    let data = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    }
    console.log(data);
  }


  return (
    <div class='bg-white h-screen w-screen flex justify-center items-center'>
      <div class="px-6 py-3 rounded min-w-[300px] shadow-lg w-[21.216vw]">
        <div class="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
          <h2 class="text-[clamp(32px,1.978vw,81px)] font-bold">Login</h2>
        </div>
        <form ref={formRef} onSubmit={loginFormHandler}>
          {/* <!-- username --> */}
          <div class="flex flex-col my-2">
            <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Email</label>
            <input name="email" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>
          <div class="flex flex-col mt-10">
            <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Password</label>
            <input name="password" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>
          <div class="flex flex-col items-center justify-center my-3">
            <div class="flex w-full items-center justify-between text-xs text-gray-500">
              <label className="flex items-center justify-center text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold"><input onChange={(e) => setRememberMe(!rememberMe)} type={"checkbox"} /> Remember me.</label>
              <Link to="findUser">
                <p className="text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold">Forgot password?</p>
              </Link>
            </div>
            <button class={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#0E123F] text-white uppercase font-bold`}>
              Submit
            </button>
            <Link to={"/signup"}>
              <button class="mb-[4.443vh] min-w-[150px] min-h-[30px] h-[4.3518518518519vh] my-1 rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-white border-2 border-[#0E123F] text-[#0E123F] font-bold uppercase">
                Apply for free
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
