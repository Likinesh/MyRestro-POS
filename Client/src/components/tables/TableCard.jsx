import React from 'react'
import { getRandBG } from '../../utils'
import { useNavigate } from 'react-router-dom'
const TableCard = ({key,name,status,intial,seats}) => {

    const navigate = useNavigate();
    const handleClick = () =>{
        if(status==='Booked') return;
        navigate('/menu')
    }

  return (
    <div onClick={handleClick} key={key} className='sm:w-[47%] lg:w-[23.5%] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg mb-4 cursor-pointer'>
        <div className='flex items-center justify-between px-1'>
            <h1 className='text-[#f5f5f5] text-xl font-semibold'>{name}</h1>
            <p className={`${status ==="Booked" ? "text-green-600 bg-[#2e4a40]":"bg-[#f6b100] text-white"} px-2 py-1 rounded-lg`}>
                {status}
            </p>
        </div>
        <div className='flex items-center justify-center mt-5 mb-8'>
            <h1 className={`${getRandBG()} text-white rounded-full p-5 text-xl`}>
                {intial}
            </h1>
        </div>
        <p className='text-[#ababab] text-xs'> No. of Seats: <span className='text-[#f5f5f5]'>{seats}</span></p>
    </div>
  )
}

export default TableCard