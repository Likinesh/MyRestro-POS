import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { login } from '../../https';
import { enqueueSnackbar } from 'notistack';
import{useDispatch} from 'react-redux'
import { setUser } from '../../redux/slice/userSlice';
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(state => state.user);
    const [formData,set_data]= useState({
            email:'',
            password:'',
        });
    
        const handleChange = (e) =>{
            set_data({...formData,[e.target.name]:e.target.value});
        }
    
        const handleSubmit = (e) =>{
            e.preventDefault();
            loginMutation.mutate(formData);
        }

        const loginMutation = useMutation({
            mutationFn: (reqData) => login(reqData),
            onSuccess: (res) =>{
                const {data } = res;
                enqueueSnackbar(data.message,{variant:'success'})
                const { _id,name,phone,email,role} = data.data;
                dispatch(setUser({ _id,name,phone,email,role}))
                console.log(data);
                navigate('/')
            },
            onError: (error) => {
                const {response} = error;
                enqueueSnackbar(response.data.message,{variant:'error'});
            }
        })

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label className=' block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Employee Email</label>
                <div value={formData.email} onChange={handleChange} className=' flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                    <input type='email' name='email' placeholder='Enter Email'
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
            <button type='submit' className=' rounded-xl w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold'>
                    Sign In
            </button>

        </form>
    </div>
  )
}

export default Login