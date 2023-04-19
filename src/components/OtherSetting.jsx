import React, { useState } from 'react'
import Switch from "react-switch";

export default function OtherSetting() {
  const [email,setEmail]=useState(JSON.parse(localStorage.getItem("email")) || false);
  const [alert,setAlert]=useState(JSON.parse(localStorage.getItem("reminder")) || false);

  return (
    <div className="bg-white rounded-xl p-2 h-[80vh]">
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-2xl font-bold">Setting</h1>
      </div>
      <div>
        <div className='flex items-center gap-[10px] mt-4'>
          <h1 class="ml-3 text-lg font-medium text-gray-900">Task Reminders</h1>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onChange={(e)=>{setAlert(!alert);localStorage.setItem("reminder",JSON.stringify(!alert))}} value="" defaultChecked={alert} class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
          </label>
        </div>
        <div className='flex items-center gap-[10px] mt-4'>
          <h1 class="ml-3 text-lg font-medium text-gray-900">Email Alerts</h1>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onChange={(e)=>{setEmail(!email);localStorage.setItem("email",JSON.stringify(!email))}} value="" defaultChecked={email} class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
          </label>
        </div>
      </div>
    </div>
  )
}
