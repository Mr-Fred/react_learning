import {configureStore} from '@reduxjs/toolkit'
import notifReducer from '../reducers/notifReducers'
import userReducer from '../reducers/userReducers'


const store = configureStore({
  reducer: {
    notification: notifReducer,
    user: userReducer
  },
})

export default store