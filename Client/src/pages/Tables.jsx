/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Backbutton from '../components/Backbutton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getTables } from '../https'
import {enqueueSnackbar} from 'notistack'

const Tables = () => {
    const [state,setState] = useState('all');
    const {data:resData,isError} = useQuery({
        queryKey:["tables"],
        queryFn: async () => {
            return await getTables();
        },
        placeholderData:keepPreviousData
    }) ;

    if(isError){
        enqueueSnackbar("Something went Wrong",{variant:'error'});
    }
  return (
    <section className='bg-[#1f1f1f] overflow-hidden h-screen'>
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
                resData?.data.data.map((table)=>{
                    return (
                        <TableCard seats={table.seats} id={table._id} name={table.tableNo} status={table.status} intial={table?.currentOrder?.customerDetails?.name} />
                    )
                })
            }
        </div>
        <Navbar />
    </section>
  )
}

export default Tables