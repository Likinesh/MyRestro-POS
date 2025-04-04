import React from 'react'
import { FaSearch } from 'react-icons/fa'
import OrdersList from './OrdersList'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrder } from '../../https';
import { enqueueSnackbar } from 'notistack';

const RecentOrders = () => {
    const { data:resData,isError } = useQuery({
        queryKey:['orders'],
        queryFn:async()=>{
          return await getOrder();
        },
        placeholderData:keepPreviousData
      });
    
      if(isError){
        enqueueSnackbar("Something Went Wrong!",{variant:'error'});
      }
  return (
    <div className='px-8 mt-6'>
        <div className='bg-[#1a1a1a] w-full h-[450px] rounded-lg'>
            <div className='flex justify-between items-center px-6 py-4 '>
                <h1 className=' text-[#f5f5f5] text-lg font-semibold tracking-wide'>Recent Orders</h1>
                <a href='' className='text-[#025cca] text-sm font-semibold'>View All</a>
            </div>

            <div className='flex items-center gap-4 bg-[#1f1f1f] py-2 rounded-[15px] px-6 mx-6'>
                <FaSearch className='text-[#f5f5f5]' />
                <input
                type='text'
                placeholder='Search'
                className='bg-[#1f1f1f] outline-none text-[#f5f5f5]'
                />
            </div>

            {/* Order's List */}
            <div className='mt-4 px-6 gap-2 overflow-y-scroll h-[300px] '>
            {
                resData?.data.length>0 ? (
                    resData.data.data.map((order)=>{
                    return <OrdersList key={order._id} order={order} />
                    })
                ):
                <p className='col-span-3 text-gray-500'>No Order Available</p>
            }
            </div>

        </div>
    </div>
  )
}

export default RecentOrders