import React, { useContext } from 'react'
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { DialogContext } from '../context/modal-context';

export default function Signup() {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useContext(DialogContext);


  const formRef = useRef();

  const signupFormhandler = (e) => {
    e.preventDefault();

    let data = {
      username: formRef.current.username.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      confirmPassword: formRef.current.confirmPassword.value,
    }
    openDialog({type:"info",title:"Signup Successfull"});
  }

  return (
    <div class='bg-white h-screen w-screen flex justify-center items-center'>
      <div class="px-6 py-3 rounded min-w-[300px] shadow-lg w-[24.216vw]">
        <div class="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
          <h2 class="text-[clamp(32px,1.978vw,81px)] font-bold">Signup</h2>
        </div>
        <form ref={formRef} onSubmit={signupFormhandler}>
          {/* <!-- username --> */}
          <div class="flex flex-col my-2">
            <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Username</label>
            <input name="username" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>

          <div class="flex flex-col mt-8">
            <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Email</label>
            <input name="email" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your email" />
          </div>

          <div class="flex flex-col mt-8">
            <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Password</label>
            <input name="password" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>

          <div class="flex flex-col mt-8">
            <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Confirm Password</label>
            <input name="confirmPassword" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password" />
          </div>

          <div class="flex flex-col items-center justify-center my-3">
            <button class={`h-[4.3518518518519vh] min-w-[150px] min-h-[30px] mt-[2.051vh] mb-[1.221vh] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#0E123F] text-white uppercase font-bold`}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
