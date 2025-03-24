import { configureStore } from "@reduxjs/toolkit";
import customerSlice from './slice/customerSlice.js';
import cartSlice from './slice/cartSlice.js';

const store=configureStore({
    reducer:{
        customer:customerSlice,
        cart:cartSlice,
    },

    devTools: import.meta.env.NODE_ENV !== "production",

});

export default store;