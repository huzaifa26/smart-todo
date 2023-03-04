import React, { useEffect, useState } from 'react'

export default function TaskList({task}) {

    const date = new Date(task.added_date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return (
      <div key={task.id} style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.2)" }} className='h-[80px] rounded-lg p-2 w-full'>
        <h2 className='text-lg font-bold'>{task.title}</h2>
        <p class="truncate w-[38vw] text-sm">{task.description}</p>
        <p class="truncate w-[38vw] text-[10px]">{formattedDate}</p>
      </div>
    )
}
