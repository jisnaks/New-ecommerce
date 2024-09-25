import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartItems.find(item => item._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const filteredCart = state.cartItems.filter(item => item._id !== action.payload._id);
      const productToRemove = state.cartItems.find(item => item._id === action.payload._id);
      if (productToRemove) {
        state.totalQuantity -= productToRemove.quantity;
      }
      state.cartItems = filteredCart;
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },
    incrementQty: (state, action) => {
      const product = state.cartItems.find(item => item._id === action.payload._id);
      if (product) {
        product.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount = calculateTotalAmount(state.cartItems);
      }
    },
    decrementQty: (state, action) => {
      const product = state.cartItems.find(item => item._id === action.payload._id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount = calculateTotalAmount(state.cartItems);
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
