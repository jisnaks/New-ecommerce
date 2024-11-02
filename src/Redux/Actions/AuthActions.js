import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user, token) => ({ type: LOGIN_SUCCESS, payload: { user, token } });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (user, token) => ({ type: REGISTER_SUCCESS, payload: { user, token } });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const logout = () => ({ type: LOGOUT });

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:EvB91LXr/auth/login', 
        credentials
      );
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess(user, token));
    } catch (error) {
      // Check if error contains a response and status
      let errorMessage = 'Something went wrong';
      if (error.response && error.response.data) {
        // Display user-friendly message for 401 error
        if (error.response.status === 401) {
          errorMessage = 'User not found';
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = 'An unexpected error occurred. Please try again.';
        }
      } else if (error.message) {
        errorMessage = error.message; // Handle network or other errors
      }
      console.error('Error details:', error); // Log full error for debugging
      dispatch(loginFailure(errorMessage));
      console.log(error,'error')
    }
  };
};



export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:EvB91LXr/auth/signup', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(registerSuccess(response.data.user, token));
    } catch (error) {
      dispatch(registerFailure(error.response.data));
    }
  };
};
