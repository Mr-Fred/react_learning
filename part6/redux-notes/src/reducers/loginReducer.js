import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setError: (state, action) => {
      state.loginError = action.payload;
    },
  },
});

export const { setUser, logout, setError } = authSlice.actions;

export default authSlice.reducer;