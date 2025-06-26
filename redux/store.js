import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import cartSlice from "./cartSlice"
import productSlice from "./productSlice"
import authSlice from "./authSlice"

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    auth: authSlice.reducer,
  },
});


export default store