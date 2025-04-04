import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});

// Endpoints

export const login = (data) => api.post('/api/user/login',data);
export const register = (data) => api.post('/api/user/register',data);
export const getUserData = () => api.get('/api/user');
export const logoutUser = () => api.post('/api/user/logout')

export const AddTable = (data) => api.post('/api/tables/',data)
export const getTables = () => api.get('/api/tables');
export const updateTable = ({tableId,...tableData}) => api.put(`/api/table/${tableId}`,tableData);

export const createOrderPayment = (data) => api.post('/api/payment/create-order',data);
export const verifyPaymentRazorpay = (data) => api.post('/api/payment/verify-payment',data);

export const addOrder = (data) => api.post('/api/order',data)
export const getOrder = () => api.get('/api/order');
