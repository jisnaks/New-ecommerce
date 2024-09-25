import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
  filters: {
    category: '',
    priceRange: '',
  },
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapiserver.reactbd.com/products');
  return response.data;
});

// Helper function to apply filters
const applyFilters = (products, filters) => {
  let filteredProducts = products;

  if (filters.category) {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category);
  }

  if (filters.priceRange === '0-20') {
    filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price <= 20);
  } else if (filters.priceRange === '20-40') {
    filteredProducts = filteredProducts.filter(product => product.price > 20 && product.price <= 40);
  } else if (filters.priceRange === '40-100') {
    filteredProducts = filteredProducts.filter(product => product.price > 40 && product.price <= 100);
  }

  return filteredProducts;
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    setPriceFilter: (state, action) => {
      state.filters.priceRange = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategoryFilter, setPriceFilter } = productSlice.actions;

export default productSlice.reducer;
