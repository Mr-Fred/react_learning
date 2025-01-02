import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null
}

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotif(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearNotif(state) {
      state.message = null
      state.type = null
    }
  }
})

export const {setNotif, clearNotif} = notifSlice.actions

export const useShowNotification = (message, type, time) => {
  return async dispatch => {
    dispatch(setNotif({message, type}))
    setTimeout(() => {
      dispatch(clearNotif())
    }, time * 1000)
  }
}

export default notifSlice.reducer