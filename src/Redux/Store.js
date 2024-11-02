// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productsReducer } from './Reducers/ProductReducer';
import { cartReducer } from './Reducers/CartReducer';
import { authReducer } from './Reducers/AuthReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
