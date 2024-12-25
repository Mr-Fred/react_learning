/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        message: action.data.message,
        color: 'green'
      }
    case 'ERROR':
      return {
        message: action.data.message,
        color: 'red'
      }
    case 'VOTE':
      return {
        message: action.data.message,
        color: 'orange'
      }
    case 'CLEAR':
      return '';
    default:
      return state;
  }
}

export const NotificationContext = createContext()

const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider