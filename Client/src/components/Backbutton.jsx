import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
const Backbutton = () => {
    const navigate = useNavigate();
  return (

    <button onClick={()=>navigate(-1)} className='bg-[#f6b100] p-3 text-xl font-bold rounded-full text-white'>
        <IoArrowBackOutline />
    </button>
  )
}

export default Backbutton