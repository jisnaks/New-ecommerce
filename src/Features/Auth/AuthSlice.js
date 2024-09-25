import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    registered: false,
    loggedIn: false,
};

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:EvB91LXr/auth/login', credentials); // API to login
        const { token, user } = response.data;  // Assume the response contains the token and user data
        localStorage.setItem('token', token);   // Save token to localStorage for further authorization
        return { user, token };  // Return user and token to store in Redux state
    } catch (error) {
        // Capture error response from API
        if (error.response && error.response.status === 404) {
            // Handle case when user is not found
            return thunkAPI.rejectWithValue({ message: 'User not found. Please register.' });
        } else if (error.response && error.response.status === 401) {
            // Handle case when credentials are invalid
            return thunkAPI.rejectWithValue({ message: 'Invalid credentials. Please try again.' });
        } else {
            // Generic error handling
            return thunkAPI.rejectWithValue({ message: 'Something went wrong. Please try again later.' });
        }
    }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:EvB91LXr/auth/signup', userData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return { user: response.data.user, token };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Create auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.loggedIn = false;
            state.registered = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loggedIn = true; // Set registered to true to redirect to login page

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.registered = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;