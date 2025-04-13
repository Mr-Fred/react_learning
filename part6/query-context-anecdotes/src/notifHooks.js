import {useContext } from 'react'
import {NotificationContext} from './NotificationContext'

// Custom hook to use the context
export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationValue must be used within a NotificationContextProvider');
  }
  return context[0];
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationDispatch must be used within a NotificationContextProvider');
  }
  return context[1];
}