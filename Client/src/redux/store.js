import { configureStore } from "@reduxjs/toolkit";
import customerSlice from './slice/customerSlice.js';
import cartSlice from './slice/cartSlice.js';
import userSlice from './slice/userSlice.js'

const store=configureStore({
    reducer:{
        customer:customerSlice,
        cart:cartSlice,
        user:userSlice
    },

    devTools: import.meta.env.NODE_ENV !== "production",

});

export default store;