/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem : (state,action) =>{
            state.push(action.payload);
        },

        removeItem: (state,action) => {
            return state.filter(item=>item.id!=action.payload);
        },

        removeAllItems:(state)=>{
            return [];
        }

    }
});

export const TotalPrice = (state) => state.cart.reduce((total,item)=>total+item.price,0);
export const { addItem,removeItem,removeAllItems } =cartSlice.actions;
export default cartSlice.reducer;