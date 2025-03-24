import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Backbutton from '../components/Backbutton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'

const Tables = () => {
    const [state,setState] = useState('all');
  return (
    <section className='bg-[#1f1f1f] overflow-hidden'>
        <div className='flex items-center justify-between px-10 py-4'>
            <div className='flex items-center gap-4'>
                <Backbutton />
                <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>
                Tables
                </h1>
            </div>
            <div className='flex items-center justify-around gap-4'>
            <button onClick={()=>setState('all')} className={`text-[#ababab] text-lg  font-semibold cursor-pointer ${state === 'all' && "bg-[#383838] rounded-lg px-5 py-2"}`}>All</button>
            <button onClick={()=>setState('booked')} className={`text-[#ababab] text-lg  font-semibold cursor-pointer ${state === 'booked' && "bg-[#383838] rounded-lg px-5 py-2"}`}>In Progress</button>
        </div>
        </div>
        <div className='flex flex-wrap gap-4 p-10'>
            {
                tables.map((table)=>{
                    return (
                        <TableCard key={table.id} seats={table.seats} id={table.id} name={table.name} status={table.status} intial={table.initial} />
                    )
                })
            }
        </div>
        <Navbar />
    </section>
  )
}

export default Tables