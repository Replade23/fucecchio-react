import React from 'react'
import MiniCalendar from '../component/MiniCalendar'


export default function Home() {

  return (

    <div className=' h-full w-4/5 flex flex-col gap-5 px-5 py-5'>
      <div className='bg-blue-950 rounded-4xl w-full h-1/2'></div>
      <div className=' w-full h-1/2 flex space-x-5'>
        <div className='bg-blue-300 w-1/3 h-full rounded-4xl flex items-center justify-center'>
          <MiniCalendar />
        </div>
        <div className='bg-blue-300 w-2/3 h-full rounded-4xl'></div>
      </div>
    </div>
  )
}
