import {useMutation} from '@tanstack/react-query'
import login from '../services/login'

import { useShowNotification } from '../reducers/notifReducers'
import { setUserData, setHeader } from '../reducers/userReducers'
import { useDispatch } from 'react-redux'

export const useLogin = () => {
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: async (creds) => {
      return await login(creds)
    },
    onSuccess: async (loggedInUser ) => {
      localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser))
      setHeader(loggedInUser.token)

      dispatch(setUserData(loggedInUser))
      dispatch(useShowNotification('Login successful', 'success', 5))
    },
    onError: (error) => {
      dispatch(useShowNotification(
        `Login failed: ${error.response.data.error}`,
        'error',
        5
      ))
    },
  })
}