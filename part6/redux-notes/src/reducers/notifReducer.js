import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: 'success',
  timeout: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
      state.timeout = action.payload.timeout
    },
    resetNotification: (state) => {
      state.message = null
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const showNotification = (message, type, timeout) => {
  return async dispatch => {
    dispatch(setNotification({ message, type, timeout }))
    setTimeout(() => {
      dispatch(resetNotification())
    }, timeout*1000)
  }
}


export default notificationSlice.reducer