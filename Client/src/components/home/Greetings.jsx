import React, { useEffect, useState } from 'react'

const Greetings = () => {
    const [datetime,setDateTime] = useState(new Date());
    
    useEffect(()=>{
        const timer = setInterval(()=>setDateTime(new Date()),1000);
        return ()=>clearInterval(timer);
    },[]);

    const formatDate= (date) =>{
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')},${date.getFullYear()}`; 
    }

    const formatTime = (date) =>{
        return `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`;
    }

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