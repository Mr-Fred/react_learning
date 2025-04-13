import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { setUser, setError } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notifReducer'

const baseUrl = 'http://localhost:3001/users'


const useLogin = () => {
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: async credentials => {
      // const response = await axios.post(baseUrl, credentials)
      return { name: 'test', token: '1234', username: "mluukkai" }
    },
    onSuccess: (user) => {
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      dispatch(setUser(user));
      dispatch(showNotification(`Welcome ${user.name}`, 'success', 5));
    },
    onError: () => {
      dispatch(setError('Wrong credentials')); // Handle error
    },
  })
}

export default useLogin