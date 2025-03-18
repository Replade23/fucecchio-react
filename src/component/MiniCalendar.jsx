import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import '../component/MiniCalendar.css'

export default function MiniCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className='flex justify-center items-center h-full w-full p-[10px]'>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}

