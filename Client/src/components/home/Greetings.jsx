import React, { useEffect, useState } from 'react'
import { formatDate, formatTime } from '../../utils';

const Greetings = () => {
    const [datetime,setDateTime] = useState(new Date());
    
    useEffect(()=>{
        const timer = setInterval(()=>setDateTime(new Date()),1000);
        return ()=>clearInterval(timer);
    },[]);

  return (
    <div className='flex justify-between items-center px-8 mt-5'>
        <div>
            <h1 className=' text-[#f5f5f5] text-3xl font-semibold tracking-wide'>Good Morning ,Amrit</h1>
            <p className='text-[#ababab] text-sm'>Give Your Best Services For Customers</p>
        </div>
        <div>
            <h1 className='text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]'> {formatTime(datetime)} </h1>
            <p className='text-[#ababab] text-md'> {formatDate(datetime)} </p>
        </div>
    </div>
  )
}

export default Greetings