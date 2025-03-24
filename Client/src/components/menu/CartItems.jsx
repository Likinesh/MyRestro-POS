import React, { useEffect, useRef } from 'react';
import {RiDeleteBin2Fill} from 'react-icons/ri';
import { FaNotesMedical } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/slice/cartSlice';

const CartItems = () => {
  const scrollRef = useRef();
  const cartData = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top:scrollRef.current.scrollHeight,
        behaviour: "smooth"
      })
    }
  },[cartData]);

  const handleDelete = (item) => {
    dispatch(removeItem(item));
  }

  return (
    <div className='px-4 py-2'>
          <h1 className='text-lg text-[#e4e4e4] font-semibold tracking-wide'>Order Details</h1>
          <div className='mt-4 overflow-y-auto scroll-auto h-[380px]' ref={scrollRef}>

          { cartData.length===0 ?
            (
              <p className='text-[#ababab] text-sm flex justify-center items-center
               h-[300px]'>Your Cart is empty</p>
            ): 
            cartData.map((item)=>{
              return(
                <div className='bg-[#1f1f1f] rounded-lg px-4 mb-2'>
              <h1 className='text-[#ababab] font-semibold tracking-wide text-md'>
              {item.name}
              </h1>
              <p className='text-[#ababab] font-semibold'>{item.quantity}</p>   
            <div className='flex items-center justify-between mt-3'>
              <div className='flex items-center gap-3'>
                <RiDeleteBin2Fill onClick={()=>handleDelete(item.id)} className='text-[#ababab] cursor-pointer' size={20} />
                <FaNotesMedical className='text-[#ababab] cursor-pointer' size={20} />
              </div>
              <p className='text-[#f5f5f5] text-md font-bold'>₹{item.price}</p>
            </div>
          </div>

              )
            })
          }

          </div>
         </div>
  )
}

export default CartItems