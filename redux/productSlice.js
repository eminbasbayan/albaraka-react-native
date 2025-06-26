import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // API çağrısı 
  const res = await fetch('https://fakestoreapi.com/products/');
  const data = await res.json();
  
  // Kasıtlı olarak gecikme oluştur
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000); // 2 saniye gecikme
  });
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action);
        
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice;
