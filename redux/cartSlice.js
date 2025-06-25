import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (findCartItem) {
       state.cartItems = state.cartItems.map((item) => {
          if (item.id === findCartItem.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        state.cartItems = [
          { ...action.payload, quantity: 1 },
          ...state.cartItems,
        ];
      }
    },
    deleteFromCart: (state, action) => {
       state.cartItems = state.cartItems.filter((item)=> item.id !== action.payload)
    },
    clearCart: (state) => {
        state.cartItems = [];
    },
    
  },
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;

export default cartSlice;
