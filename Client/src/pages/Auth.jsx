import React, { useState } from 'react'
import restaurent from '../assets/images/restaurant-img.jpg'
import logo from '../assets/images/logo.png'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

const Auth = () => {

  const [reg,set_reg] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
      {/* Left */}
      <div className='w-1/2 relative flex items-center justify-center bg-cover'>
        {/* Bg */}
        <img src={restaurent} className=' w-full h-full object-cover' alt='Restaurent Img' />
        {/* overlay */}
        <div className='absolute inset-0 bg-black opacity-70'></div>

        {/* Quote */}
        <blockquote className='absolute bottom-10 px-8 mb-10 text-2xl italic text-white'>
          "Serve customers the best food with prompt and friendly service in a welcoming atmosphere,and they'll keep coming back"
          <br />
          <span className=' block mt-4 text-yellow-400'>-Founder of Restro</span>
        </blockquote>
      </div>

      {/* Right */}
      <div className='w-1/2 min-h-screen bg-[#1a1a1a] p-10'>
        <div className='flex flex-col items-center gap-2'>
          <img src={logo} alt='Restro logo' className='h-14 w-14 border-2 rounded-full p-1' />
          <h1 className=' text-lg font-semibold text-[#f5f5f5] tracking-wide '>Restro</h1>
        </div>

        <h2 className=' text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10'>
          {reg ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Components */}
        { reg ? <Register isReg={set_reg} /> : <Login />  }
        
        <div className='flex justify-center mt-6'>
          {reg?
          (
            <p className='text-sm text-[#ababab] '>Already having an account? &ensp;
            <a className='text-yellow-400 font-semibold hover:underline' href='#' onClick={()=>set_reg(!reg)}>
              Sign in
            </a>
          </p>
          )
          :
          (
            <p className='text-sm text-[#ababab] '>Don't have an account? &ensp;
            <a className='text-yellow-400 font-semibold hover:underline' href='#' onClick={()=>set_reg(!reg)}>
              Sign up
            </a>
          </p>
          )
          }
        </div>
      </div>

    </div>
  )
}

export default Auth