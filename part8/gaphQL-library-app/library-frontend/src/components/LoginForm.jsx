// login component
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from 'prop-types'
import { LOGIN } from "../lib/queries";

const LoginForm = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const user = result.data.login
      setCurrentUser(user)
      localStorage.setItem('library-user', user.username)
      localStorage.setItem('token', user.token)
      localStorage.setItem('user-favorite-genre', user.favoriteGenre)
    }
  }, [result.data, setCurrentUser])

  const submit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
    setUsername('')
    setPassword('')

  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
}

export default LoginForm
