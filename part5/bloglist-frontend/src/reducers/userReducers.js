import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload
      state.isLoggedIn = true
    },
    setHeader(state, action) {
      state.token = `Bearer ${action.payload}`
    },
    clearUserData(state) {
      state.user = null
      state.isLoggedIn = false
      localStorage.removeItem('LoggedInUser')
    },
  }
})

export const {setUserData, clearUserData, setHeader} = userSlice.actions

export default userSlice.reducer