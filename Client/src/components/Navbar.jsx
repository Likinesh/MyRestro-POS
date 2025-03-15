import React, { useState } from 'react'
import {FaHome} from 'react-icons/fa'
import {MdOutlineReorder,MdTableBar} from 'react-icons/md'
import {CiCircleMore} from 'react-icons/ci'
import {BiSolidDish} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
const Navbar = () => {

    const navigate = useNavigate();
    const [isOpen,setisOpen] = useState(false);
    const openModal = ()=>setisOpen(true);
    const closeModal = ()=>setisOpen(false);
    const [count,setCount] = useState(0);
    const IncreamentCount = ()=>setCount((count) =>count<6?count+1:6);
    const DecreamentCount = ()=>setCount((count) =>count>0?count-1:0)
  return (
    <div className=' fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>
        
        <button onClick={()=>navigate('/')} className='flex items-center justify-center text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px] cursor-pointer'>
            <FaHome className=' inline mr-2 ' size={20}/> 
            <p>Home</p>
        </button>
        
        <button onClick={()=>navigate('/orders')} className='flex items-center justify-center text-[#ababab] w-[200px] cursor-pointer'>
            <MdOutlineReorder className=' inline mr-2 ' size={20} /> 
            <p>Orders</p>
        </button>
        
        <button onClick={()=>navigate('/tables')} className='flex items-center justify-center text-[#ababab] w-[200px] cursor-pointer'>
            <MdTableBar className=' inline mr-2 ' size={20} />
            <p>Tables</p>
        </button>
        
        <button className='flex items-center justify-center text-[#ababab] w-[200px] cursor-pointer'>
            <CiCircleMore className=' inline mr-2 ' size={20} />
            <p>More</p>
        </button>

        <button
            onClick={openModal}
         className='bg-[#F6B100] text-[#f5f5f5] rounded-full p-3 items-center absolute bottom-8 cursor-pointer'>
            <BiSolidDish  size={25}/>
        </button>
        <Modal isOpen={isOpen} title="Create Order" onClose={closeModal}>
            <div >
                <label className=' block text-[#ababab] mb-2 text-sm font-medium'>Customer Name</label>
                <div className=' flex items-center p-3 rounded-lg px-4 bg-[#1f1f1f]'>
                    <input type='text' name='' placeholder='Enter Customer Name' id='' className='bg-transparent flex-1 text-white focus:outline-none' />
                </div>
            </div>
            <div >
                <label className=' block text-[#ababab] mb-2 mt-4 text-sm font-medium'>Customer Phone Number</label>
                <div className=' flex items-center p-3 rounded-lg px-4 bg-[#1f1f1f]'>
                    <input type='number' name='' placeholder='Enter Customer Phone Number' id='' className='bg-transparent flex-1 text-white focus:outline-none' />
                </div>
            </div>
            <div>
                <label className=' block mb-2 mt-3 text-sm font-medium text-[#ababab]'>Guest</label>
                <div className=' flex justify-center gap-[20%] items-center p-3.5 rounded-lg px-3.5 bg-[#1f1f1f]'>
                    <div>
                        {count>0 && <button className='text-yellow-500 text-2xl' onClick={DecreamentCount}>&minus;</button>}
                    </div>
                    <div>
                    <span className='text-white'>{count} Persons</span>
                    </div>
                    <div>
                    {count<6 && <button className='text-yellow-500 text-2xl' onClick={IncreamentCount}>&#43;</button>}
                    </div>    
                </div>
            </div>
            <button onClick={()=>{navigate('/tables'); setisOpen(false)}} className='w-full bg-[#f6b100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700'>
                Create Order
            </button>
        </Modal>
    </div>
  )
}

export default Navbar