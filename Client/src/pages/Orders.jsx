import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Ordercard from '../components/order/Ordercard'
import Backbutton from '../components/Backbutton'
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import { getOrder } from '../https';
import {enqueueSnackbar} from 'notistack'

const Orders = () => {
  const [state,setState] = useState('all');
  
  const { data:resData,isError } = useQuery({
    queryKey:['orders'],
    queryFn:async()=>{
      return await getOrder();
    },
    placeholderData:keepPreviousData
  });

  if(isError){
    enqueueSnackbar("Something Went Wrong!",{variant:'error'});
  }

  return (
    <section className='bg-[#1f1f1f] h-[calc(150vh-5rem)] overflow-hidden'>
      <div className='flex items-center justify-between px-10 py-4'>
        <div className='flex items-center gap-4'>
          <Backbutton />
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Orders</h1>
        </div>
        <div className='flex items-center justify-around gap-4'>
          <button onClick={()=>setState('all')} className={`text-[#ababab] text-lg  font-semibold cursor-pointer ${state === 'all' && "bg-[#383838] rounded-lg px-5 py-2"}`}>All</button>
          <button onClick={()=>setState('progress')} className={`text-[#ababab] text-lg  font-semibold cursor-pointer ${state === 'progress' && "bg-[#383838] rounded-lg px-5 py-2"}`}>In Progress</button>
          <button onClick={()=>setState('ready')} className={`text-[#ababab] text-lg  font-semibold cursor-pointer ${state === 'ready' && "bg-[#383838] rounded-lg px-5 py-2"}`}>Ready</button>
          <button onClick={()=>setState('completed')} className={`text-[#ababab] text-lg  font-semibold cursor-pointer ${state === 'completed' && "bg-[#383838] rounded-lg px-5 py-2"}`}>Completed</button>
        </div>
      </div>

      <div className='px-14 py-4 flex flex-wrap gap-6 items-center overflow-y-scroll scrollbar-hidden'>
        {
          resData?.data.length>0 ? (
            resData.data.data.map((order)=>{
              return <Ordercard key={order._id} order={order} />
            })
          ):
          <p className='col-span-3 text-gray-500'>No Order Available</p>
        }
      </div>

      <Navbar />
    </section>
  )
}

export default Orders