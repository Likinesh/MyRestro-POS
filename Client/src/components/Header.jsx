/* eslint-disable no-unused-vars */
// import React from 'react'
import { FaSearch,FaUserCircle,FaBell } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import {IoLogOut} from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../https';
import { removeUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';

export default function Header() {

  const navigate = useNavigate();
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleLogout = async ()=>{
    logoutMutation.mutate();
  }

  const logoutMutation = useMutation({
    mutationFn: ()=>logoutUser(),
    onSuccess:(data)=>{
      console.log(data);
      dispatch(removeUser());
      navigate('/auth');
    },
    onError:(error)=>{
      console.log(error);
    }
  })

  return (
    <header className="flex justify-between items-center py-4 px-4 bg-[#1a1a1a]">
      {/* Logo */}
      <div className='flex items-center gap-2'>
        <img src={logo} className='h-8 w-8' alt='Restro Logo'/>
        <h1 className='text-lg font-semibold text-[#f5f5f5]'>Restro</h1>
      </div>

      {/* Search */}
      <div className='flex items-center gap-4 bg-[#1f1f1f] py-2 w-[500px] rounded-[15px] px-5'>
        <FaSearch className='text-[#f5f5f5]' />
        <input
          type='text'
          placeholder='Search'
          className='bg-[#1f1f1f] outline-none text-[#f5f5f5]'
        />
      </div>

      {/* USER */}
      <div className='flex items-center gap-4'>
        {
          userData.role==="Admin" &&
          (<div onClick={()=>navigate('/dashboard')} className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
            <MdDashboard className='text-[#f5f5f5] text-2xl' />
          </div>)
        }
        <div className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
          <FaBell className='text-[#f5f5f5] text-2xl' />
        </div>
        <div className=' flex  items-center gap-3 cursor-pointer'>
          <FaUserCircle className='text-[#f5f5f5] text-4xl'/>
          <div className=' flex flex-col items-start'>
            <h1 className=' text-md text-[#f5f5f5] font-semibold'>{userData.name || "Test"}</h1>
            <p className=' text-xs text-[#ababab] font-medium'>{userData.role || "Role"}</p>
          </div>
          <IoLogOut onClick={handleLogout} className='text-[#f5f5f5]' size={40} />
        </div>
      </div>
    </header>
  )
}
