import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const SET_PRICE_FILTER = 'SET_PRICE_FILTER';

export const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
export const fetchProductsSuccess = (products) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
export const fetchProductsFailure = (error) => ({ type: FETCH_PRODUCTS_FAILURE, payload: error });

export const setCategoryFilter = (category) => ({ type: SET_CATEGORY_FILTER, payload: category });
export const setPriceFilter = (priceRange) => ({ type: SET_PRICE_FILTER, payload: priceRange });

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await axios.get('https://fakestoreapiserver.reactbd.com/products');
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

export const applyFilters = (products, filters) => {
  let filteredProducts = products;

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category);
  }

  if (filters.priceRange === '0-20') {
    filteredProducts = filteredProducts.filter((product) => product.price >= 0 && product.price <= 20);
  } else if (filters.priceRange === '20-40') {
    filteredProducts = filteredProducts.filter((product) => product.price > 20 && product.price <= 40);
  } else if (filters.priceRange === '40-100') {
    filteredProducts = filteredProducts.filter((product) => product.price > 40 && product.price <= 100);
  }

  return filteredProducts;
};