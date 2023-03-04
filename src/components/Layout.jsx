import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { FaTasks } from "react-icons/fa"
import { AiFillSetting } from "react-icons/ai"
import {RiLogoutBoxRLine} from "react-icons/ri"

export default function Layout() {
  return (
    <div className='w-full min-h-screen bg-[#0E123F] flex'>
      <div className=' w-60 p-2 pl-4 pt-8 text-white'>
        <h1 className='font-bold text-2xl text-center'>Logo</h1>
        <div className='mt-16 flex flex-col justify-between h-[85%]'>
          <ul className='text-lg space-y-6'>
            <NavLink end to={"/dashboard"} className={({ isActive }) => isActive ? 'flex items-center space-x-4 bg-[#AF91E9] h-14 p-4 rounded-xl' : 'flex items-center space-x-4 h-14 p-4 rounded-xl hover:bg-[#AF91E920]'}>
              <MdDashboard className='text-2xl' />
              <li> Dashboard</li>
            </NavLink>
            <NavLink end to={"/dashboard/tasks"} className={({ isActive }) => isActive ? 'flex items-center space-x-4 bg-[#AF91E9] h-14 p-4 rounded-xl' : 'flex items-center space-x-4 h-14 p-4 rounded-xl hover:bg-[#AF91E920]'}>
              <FaTasks className='text-2xl' />
              <li>Tasks</li>
            </NavLink>
            <NavLink end to={"/dashboard/setting"} className={({ isActive }) => isActive ? 'flex items-center space-x-4 bg-[#AF91E9] h-14 p-4 rounded-xl' : 'flex items-center space-x-4 h-14 p-4 rounded-xl hover:bg-[#AF91E920]'}>
              <AiFillSetting className='text-2xl' />
              <li>Setting</li>
            </NavLink>
          </ul>
          <NavLink to={'/'} className="flex items-center space-x-4 h-14 p-4 rounded-xl hover:bg-[#AF91E920]">
            <RiLogoutBoxRLine className='text-2xl' />
            <p>Logout</p>
          </NavLink>
        </div>
      </div>
      <div className='bg-[#eaeffc] flex-1 rounded-3xl p-4 m-4'>
        <Outlet />
      </div>
    </div>
  )
}
