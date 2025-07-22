import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../reducers/filterReducer'
import loginReducer from '../reducers/loginReducer'
// import notesReducer from '../reducers/noteReducer'
import notificationReducer from '../reducers/notifReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    login: loginReducer,
    // notes: notesReducer,
    notification: notificationReducer
  }
})

export default store