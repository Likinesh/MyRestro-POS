/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeAllItems, TotalPrice } from '../../redux/slice/cartSlice';
import { enqueueSnackbar } from 'notistack';
import { addOrder, createOrderPayment, updateTable, verifyPaymentRazorpay } from '../../https';
import {useMutation} from '@tanstack/react-query'
import { removeCustomers } from '../../redux/slice/customerSlice';
const Bill = () => {
  const dispatch = useDispatch();
    const customerData = useSelector(state => state.customer)
    const cartData = useSelector(state => state.cart );
    const total = useSelector(TotalPrice);
    const tax = 0.05*total;
    const Totalprice = total+tax;

    function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }

    const [paymentMethod,setPayment] = useState();
    
    const [orderInfo, setOrderInfo] = useState();
    const [showInvoice,setShowInvoice] = useState(false);
    const handlePlaceOrder = async () => {
        if(!paymentMethod){
            enqueueSnackbar("Please select a payment Method!",{variant:'warning'});
            return;
        }
        // load Script
          if(paymentMethod === "Online"){
            try {
              const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
              );
        
              if (!res) {
                enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
                  variant: "warning",
                });
                return;
              }
  
              // order
        
              const reqData = {
                amount: Totalprice, // Amount in INR
                currency: "INR",
              };
        
              const { data } = await createOrderPayment(reqData);
        
              const options = {
                key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "MyRestro",
                description: "Secure Payment for Your Meal",
                order_id: data.order.id,
                handler: async function (response) {
                  const verification = await verifyPaymentRazorpay(response);
                  console.log(verification);
                  enqueueSnackbar(verification.data.message, { variant: "success" });
  
                  const orderData={
                    customerDetails:{
                      name:customerData.customerName,
                      phone:customerData.customerPhone,
                      guests:customerData.guests
                    },
                    orderStatus:"In Progress",
                    bills:{
                      total:total,
                      tax:tax,
                      totalWithTax:Totalprice
                    },
                    items:cartData,
                    table:customerData.table.tableId,
                    paymentMethod:paymentMethod,
                    paymentData:{
                        razorpay_order_id:response.razorpay_order_id,
                        razorpay_payment_id:response.razorpay_payment_id
                    }
                  };
                  setTimeout(()=>{
                    OrderMutation.mutate(orderData);
                  },1500)
  
                },
                prefill: {
                  name: customerData.name,
                  email: "",
                  contact: customerData.phone,
                },
                theme: { color: "#025cca" },
              };
        
              const rzp = new window.Razorpay(options);
              rzp.open();
            } catch (error) {
              console.log(error);
              enqueueSnackbar("Payment Failed!", { variant: "error" });
            }
          }
          else{
            const orderData={
              customerDetails:{
                name:customerData.customerName,
                phone:customerData.customerPhone,
                guests:customerData.guests
              },
              orderStatus:"In Progress",
              bills:{
                total:total,
                tax:tax,
                totalWithTax:Totalprice
              },
              items:cartData,
              table:customerData.table.tableId,
              paymentMethod:paymentMethod,
            };
            setTimeout(()=>{
              OrderMutation.mutate(orderData);
            },1500)
          }
        };

        const OrderMutation = useMutation({
          mutationFn: (reqData) => addOrder(reqData),
          onSuccess:(res)=>{
            const { data } = res.data;
            setOrderInfo(data);
            const tableData = {
              status:'Booked',
              orderId:data._id,
              tableId:data.table
            }
            setTimeout(()=>{
              tableUpdationMutation.mutate(tableData);
            },1500)
            enqueueSnackbar("Order Placed!",{variant:"success"});
          },
          onError:(error)=>{
            enqueueSnackbar('Order Failed!',{variant:'error'});
          }
        });

        const tableUpdationMutation = useMutation({
          mutationFn:(reqData) => updateTable(reqData),
          onSuccess:(resData)=>{
            dispatch(removeCustomers());
            dispatch(removeAllItems());
          },
          onError:(error)=>{
            enqueueSnackbar('Table Allocation Failed!',{variant:'error'});
          }
        })
    
  return (
    <>
        <div className=' flex items-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Items({cartData.length})</p>
            <h1 className='text-[#f5f5f5] text-md font-bold'>{total.toFixed(2)}</h1>
        </div>
        <div className=' flex items-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Taxes(5%)</p>
            <h1 className='text-[#f5f5f5] text-md font-bold'>{tax.toFixed(2)}</h1>
        </div>
        <div className=' flex items-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Total Price</p>
            <h1 className='text-[#f5f5f5] text-md font-bold'>{Totalprice.toFixed(2)}</h1>
        </div>
        <div className='flex items-center gap-3 px-5 mt-4'>
            <button onClick={()=>setPayment('Cash')} className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${ paymentMethod==='Cash' ? "bg-[#383737]": '' }`}>Cash</button>
            <button onClick={()=>setPayment('Online')} className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${ paymentMethod==='Online' ? "bg-[#383737]": '' }`}>Online</button>
        </div>
        <div className='flex items-center gap-3 px-5 mt-4'>
            <button className='bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg'>Print Receipt</button>
            <button className='bg-[#f2bb4ebd] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg' onClick={handlePlaceOrder}>Place Order</button>
        </div>
        {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  )
}

export default Bill