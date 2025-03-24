import React, { useState } from 'react'
import { menus } from '../../constants'
import { GrRadialSelected } from 'react-icons/gr'
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slice/cartSlice';

const MenuContainer = () => {
    const [selected,setSelected] = useState(menus[0]);
    const [count,setCount] = useState(0);
    const [itemId,setItemId] = useState();
    const dispatch = useDispatch();

    const IncreamentCount = (id) =>{
        setItemId(id);
        setCount((count) =>count>9?10:count+1);
    };
    
    const DecreamentCount = (id) =>{
        setItemId(id);
        setCount((count) =>count>0?count-1:0)
    };

    const handleAdd = (item) => {
        if(count===0)   return;
        const {name,price} = item;
        const newObj = {id: new Date(), name, priceperQuantity:price, quantity:count, price:price*count };
        dispatch(addItem(newObj));
        setCount(0);
    }
    
    return (
    <>
        <div className='grid sm:grid-cols-3 grid-cols-4 gap-4 px-8 py-4 w-[100%]' >
            {
                menus.map((menu)=>{
                    return(
                        <div key={menu.id} className=' flex flex-col items-start justify-baseline p-4 rounded-lg h-[100px] cursor-pointer' style={{backgroundColor:menu.bgColor}} 
                            onClick={()=>{setSelected(menu); setCount(0); setItemId(0)}}
                            >
                            <div className=' flex items-center justify-between w-full'>
                                <h1 className='text-[#f5f5f5] text-lg font-semibold'>{menu.icon}  {menu.name}</h1>
                                {selected.id===menu.id && <GrRadialSelected className='text-white ' size={20} />}
                            </div>
                            <p className=' text-[#ababab] text-sm font-semibold'>{menu.items.length} items</p>
                        </div>
                    )
                })        
            }
        </div>

        <hr className='border-[#2a2a2a] border-t-2 mt-4' />

        <div>
        <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-4 px-8 py-4 w-[110%]' >
            {
                selected?.items.map((menu)=>{
                    return(
                        <div key={menu.id} 
                            className=' flex flex-col items-start justify-center p-4.5 gap-2.5 rounded-lg h-[100%]  cursor-pointer hover:bg-[#2a2a2a] w-[100%] bg-[#1a1a1a]'
                            >
                            <div className='flex items-start justify-between w-full'>
                                <h1 className='text-[#f5f5f5] text-lg font-semibold'>{menu.name}</h1>
                                <button className='bg-[#2e4a40] text-[#02ca3a] cursor-pointer p-2 rounded-lg' onClick={()=>handleAdd(menu)}><FaShoppingCart size={20} /></button>
                            </div>
                            <div className='flex items-center justify-between w-full gap-[7%]'>
                            <p className=' text-[#f5f5f5] text-xl font-bold'>₹{menu.price}</p>
                            <div className=' flex items-center justify-center gap-[20%] p-4 rounded-lg px-5 bg-[#1f1f1f]'>
                                <div>
                                    <button className='text-yellow-500 text-2xl cursor-pointer' onClick={()=>DecreamentCount(menu.id)}>&minus;</button>
                                </div>
                                <div>
                                <span className='text-white'>{menu.id===itemId?count:0}</span>
                                </div>
                                <div>
                                    <button className='text-yellow-500 text-2xl cursor-pointer' onClick={()=>IncreamentCount(menu.id)}>&#43;</button>
                                </div>    
                            </div>
                            </div>
                        </div>
                    )
                })        
            }
        </div>
        </div>
    </>
  )
}

export default MenuContainer