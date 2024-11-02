import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Actions/AuthActions";

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    registered: false,
    loggedIn: false,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token, loggedIn: true };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        localStorage.removeItem('token');
        return { ...state, user: null, token: null, loggedIn: false };
      case REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token, registered: true };
      default:
        return state;
    }
  };