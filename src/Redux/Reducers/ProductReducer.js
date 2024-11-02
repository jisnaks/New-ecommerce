import { applyFilters, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, SET_CATEGORY_FILTER, SET_PRICE_FILTER } from "../Actions/productActions";

const initialState = {
    products: [],
    filteredProducts: [],
    filters: { category: '', priceRange: '' },
    status: 'idle',
    error: null,
  };
  
  export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, status: 'loading' };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          products: action.payload,
          filteredProducts: applyFilters(action.payload, state.filters),
        };
      case FETCH_PRODUCTS_FAILURE:
        return { ...state, status: 'failed', error: action.payload };
      case SET_CATEGORY_FILTER:
        return {
          ...state,
          filters: { ...state.filters, category: action.payload },
          filteredProducts: applyFilters(state.products, { ...state.filters, category: action.payload }),
        };
      case SET_PRICE_FILTER:
        return {
          ...state,
          filters: { ...state.filters, priceRange: action.payload },
          filteredProducts: applyFilters(state.products, { ...state.filters, priceRange: action.payload }),
        };
      default:
        return state;
    }
  };
