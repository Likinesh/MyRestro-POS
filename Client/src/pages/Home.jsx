import React from 'react'
import Navbar from '../components/Navbar'
import Greetings from '../components/home/Greetings'
import MiniCard from '../components/home/MiniCard'
import { BsCashCoin } from 'react-icons/bs'
import { GrInProgress } from 'react-icons/gr'
import RecentOrders from '../components/home/RecentOrders'
import PopularDish from '../components/home/PopularDish'

const Home = () => {
  return (
    <section className='bg-[#1f1f1f] gap-3 flex h-[calc(150vh-5rem)] overflow-hidden'>
      {/* Left */}
      <div className=' flex-[3]'> 
          <Greetings />
          <div className='flex items-center w-full gap-3 px-8 mt-8'>
            <MiniCard title="Total Earnings" icon={<BsCashCoin/>}  number={512} footerNum={1.6}/>
            <MiniCard title="In Progress" icon={<GrInProgress/>} number={16} footerNum={3.6} />
          </div>
          <RecentOrders />
      </div>
      {/* Right */}
      <div className=' flex-[2]'>
        <PopularDish />
      </div>
      <Navbar />
    </section>
  )
}

export default Home