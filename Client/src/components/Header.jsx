/* eslint-disable no-unused-vars */
// import React from 'react'
import { FaSearch,FaUserCircle,FaBell } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
export default function Header() {
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
        <div className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
          <FaBell className='text-[#f5f5f5] text-2xl' />
        </div>
        <div className=' flex  items-center gap-3 cursor-pointer'>
          <FaUserCircle className='text-[#f5f5f5] text-4xl'/>
          <div className=' flex flex-col items-start'>
            <h1 className=' text-md text-[#f5f5f5] font-semibold'>Amrit Raj</h1>
            <p className=' text-xs text-[#ababab] font-medium'>Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
