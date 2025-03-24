import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate, formatTime, getIntials } from '../../utils';

const CustomerInfo = () => {
  const [dateTime,set_dateTime] = useState(new Date());
  const customerData = useSelector((state)=>state.customer);
  useEffect(()=>{
          const timer = setInterval(()=>set_dateTime(new Date()),1000);
          return ()=>clearInterval(timer);
  },[]);
  return (
    <div className='flex items-center justify-between px-4 py-3'>
            <div className='flex flex-col items-start'>
              <h1 className='text-md text-[#f5f5f5] font-semibold tracking-wide'>{customerData.customerName || "Customer Name"}</h1>
              <p className='text-xs text-[#ababab] font-medium mt-1'>#{customerData.orderId || "N/A"} / Dine</p>
              <p className='text-xs text-[#ababab] font-medium mt-2 '>{formatDate(dateTime)} {formatTime(dateTime)}</p>
            </div>
            <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg'>{getIntials(customerData.customerName) || "CN"}</button>
         </div>
  )
}

export default CustomerInfo