export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QTY = 'INCREMENT_QTY';
export const DECREMENT_QTY = 'DECREMENT_QTY';
export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});


export const setCart = (cartItems) => ({
  type: SET_CART,
  payload: cartItems,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});


export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const incrementQty = (productId) => ({
  type: INCREMENT_QTY,
  payload: productId,
});

export const decrementQty = (productId) => ({
  type: DECREMENT_QTY,
  payload: productId,
});