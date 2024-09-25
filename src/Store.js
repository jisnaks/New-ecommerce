// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/Cart/CartSlice';
import authReducer from './Features/Auth/AuthSlice';
import ProductReducer from './Features/Product/ProductSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products :ProductReducer,
  },
});
