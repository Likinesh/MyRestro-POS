/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BiSolidDish } from 'react-icons/bi'
import { MdCategory, MdTableBar } from 'react-icons/md'
import Metrics from '../components/dashboard/Metrics'
import RecentOrders from '../components/dashboard/RecentOrders'
import Modal from '../components/dashboard/Modal'

const Dashboard = () => {
    const [isTabelModal,setTableModal]= useState(false);
    const [active,setActive] = useState('Metrics')
    const buttons=[
        {label:"Add Table",icon:<MdTableBar />, action:"table"},
        {label:"Add Category",icon:<MdCategory />, action:"category"},
        {label:"Add Dishes",icon:<BiSolidDish />, action:"dishes"},
    ]
    const tabs=[
        "Metrics","Orders","Payment"
    ];

    const handleOpenModal = (action)=>{
        if(action === "table") setTableModal(true);

    }
  return (
    <div className='bg-[#1f1f1f] h-[calc(150vh-5rem)] w-full'>
        <div className='container mx-auto flex items-center justify-between py-14 px-6 md:px-4'>
            <div className='flex items-center gap-3'>
                {
                    buttons.map(({label,icon,action})=>{
                        return(
                            <button onClick={()=>handleOpenModal(action)} className='bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2'>
                                {label}{icon}
                            </button>
                        )
                    })
                }
            </div>
            <div className='flex items-center gap-3'>
                {
                    tabs.map((name)=>{
                        return(
                            <button onClick={()=>setActive(name)} className={`${ active===name ? 'bg-[#262626]' : 'bg-[#1a1a1a] hover:bg-[#262626] ' } px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2`}>
                                {name}
                            </button>
                        )
                    })
                }
            </div>
        </div>
        { active==="Metrics" && <Metrics />}
        { active==='Orders' && <RecentOrders />}
        {isTabelModal && <Modal isModalOpen={setTableModal}/> }
    </div>
  )
}

export default Dashboard