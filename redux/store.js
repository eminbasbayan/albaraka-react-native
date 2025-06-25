import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import cartSlice from "./cartSlice"
import productSlice from "./productSlice"

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer
  },
});


export default store