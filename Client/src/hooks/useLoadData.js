import {useEffect, useState} from 'react';
import { getUserData } from '../https';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';


export const useLoadData = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoad,set_load] = useState(true);
    useEffect(() => {
      const fetchUser = async () =>{
        try {
            const { data } = await getUserData();
            const { _id,name,email,phone,role } = data.data;
            dispatch(setUser({ _id,name,email,phone,role }));
            // navigate('/')
        } catch (error) {
            dispatch(removeUser());
            navigate('/auth')
            console.log(error);
        }
        finally{
            set_load(false)
        }
      };
      fetchUser();
    }, [dispatch,navigate]);
    return isLoad;
};