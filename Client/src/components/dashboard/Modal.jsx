/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import { motion } from 'framer-motion';
const Modal = ({isModalOpen}) => {

    const [tableData,setTableData] = useState({
        tableNo:'',
        seats:''
    });

    const handleInput = (e) =>{
        const {name,value} = e.target;
        setTableData((prev)=>({...prev,[name]:value}));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
    }

    const handleClose = ()=>{
        isModalOpen(false)
    }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <motion.div initial={{opacity:0,scale:0.9}}
        animate={{opacity:1,scale:1}}
        exit={{opacity:0,scale:0.9}}
        transition={{duration:0.3,ease:'easeInOut'}}
        className='bg-[#262626] p-6 rounded-lg shadow-lg w-96'
        >
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#f5f5f5] text-xl font-semibold'>Add Table</h2>
                <button onClick={handleClose} className='text-[#f5f5f5] hover:text-red-500'>
                    <IoMdClose size={24}/>
                </button>
            </div>

            {/* Body */}
            <form onSubmit={handlesubmit} className='space-y4 mt-10'>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Table Number</label>
                <div className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input value={tableData.tableNo} onChange={handleInput} type='number' name='tableNo' placeholder='Table No.'
                    className='bg-transparent flex-1 text-white focus:outline-none'
                    required />
                </div>
            </div>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Number of Seats</label>
                <div className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input value={tableData.seats} onChange={handleInput} type='number' name='seats' placeholder='No. of Seats'
                    className='bg-transparent flex-1 text-white focus:outline-none'
                    required />
                </div>
            </div>
            <button type='submit' className=' rounded-xl w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold'>
                    Add Table
            </button>
            </form>

        </motion.div>
    </div>
  )
}

export default Modal