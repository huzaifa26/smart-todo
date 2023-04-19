import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Setting() {
  return (
    <div className='w-[100%] !max-h-[100%] bg-[white] rounded-xl overflow-auto'>
      <ul className='flex items-center h-12 pt-2'>
        <NavLink end to={"/home/setting"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AF91E9] text-[#AF91E9]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='w-32 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Profile</li>
        </NavLink>
        <NavLink end to={"/home/setting/change-password"} className={({ isActive }) => isActive ? "border-b-[3px] border-[#AF91E9] text-[#AF91E9]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='w-48 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Change Password</li>
        </NavLink>
        <NavLink end to={"/home/setting/other"} className={({ isActive }) => isActive || location.pathname.includes("/home/setting/other") ? "border-b-[3px] border-[#AF91E9] text-[#AF91E9]" : "text-[#595659] border-b-[3px] border-[rgba(0,0,0,0.0)] transition-all duration-500"}>
          <li className='w-32 px-6 py-2 font-bold flex items-center justify-center gap-[5px]'>Other</li>
        </NavLink>
      </ul>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
