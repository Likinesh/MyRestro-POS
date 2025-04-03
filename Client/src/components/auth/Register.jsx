import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { register } from '../../https';
import { enqueueSnackbar } from 'notistack';

const Register = ({isReg}) => {
    const [formData,set_data]= useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        role:'',
    });

    const handleChange = (e) =>{
        set_data({...formData,[e.target.name]:e.target.value});
    }

    const roleSelection = (selectedRole) =>{
        set_data({...formData,role:selectedRole});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        registerMutation.mutate(formData);
    }

    const registerMutation = useMutation({
        mutationFn: (data) => register(data),
        onSuccess: (res)=>{
            const {data}=res;
            enqueueSnackbar(data.message,{variant:'success'});
            set_data({
                name:'',
                email:'',
                phone:'',
                password:'',
                role:'',
            });
            setTimeout(()=>{
                isReg(false);
            },1500);
        },
        onError: (error)=>{
            const {response} = error;
            enqueueSnackbar(response.data.message,{variant:'error'});
        }
    })

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label className=' block text-[#ababab] mb-2 text-sm font-medium'> Employee Name</label>
                <div className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input type='text' value={formData.name} onChange={handleChange} name='name' placeholder='Enter Name'
                    className='bg-transparent flex-1 text-white focus:outline-none'
                    required />
                </div>
            </div>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Employee Email</label>
                <div value={formData.email} onChange={handleChange} className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input type='email' name='email' placeholder='Enter Email'
                    className='bg-transparent flex-1 text-white focus:outline-none'
                    required />
                </div>
            </div>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Employee Phone</label>
                <div value={formData.phone} onChange={handleChange} className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input type='number' name='phone' placeholder='Enter number'
                    className='bg-transparent flex-1 text-white focus:outline-none'
                    required />
                </div>
            </div>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Employee Password</label>
                <div value={formData.password} onChange={handleChange} className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input type='password' name='password' placeholder='Enter password'
                    className='bg-transparent flex-1 text-white focus:outline-none'
                    required />
                </div>
            </div>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Change your role</label>
                <div className='flex items-center gap-3 mt-4'>
                    {['Waiter',"Cashier",'Admin'].map((role)=>{
                        return(
                            <button type='button' onClick={()=>roleSelection(role)} key={role} className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${formData.role===role ? " bg-indigo-600" :" "}`}>
                                {role}
                            </button>
                        )
                    })}
                </div>
            </div>
            <button type='submit' className=' rounded-xl w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold'>
                    Sign Up
            </button>
        </form>
    </div>
  )
}

export default Register