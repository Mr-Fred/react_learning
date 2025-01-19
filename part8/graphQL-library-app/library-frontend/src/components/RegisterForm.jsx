// Register new user
import { useState } from 'react'
// import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../lib/queries'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createUser({ variables: { username, favoriteGenre, password } })
    setUsername('')
    setPassword('')
    setFavoriteGenre('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          favorite genre <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <button type='submit'>register</button>
      </form>
    </div>
  )
}

// RegisterForm.propTypes = {
//   setError: PropTypes.func.isRequired
// }

export default RegisterForm
