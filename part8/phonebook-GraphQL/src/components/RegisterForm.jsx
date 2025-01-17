//Create new User
import { useState } from "react";
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../services/queries"
import PropTypes from 'prop-types'

const RegisterForm = ({ setError }) => {
  const [username, setUsername] = useState('')

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    createUser({ variables: { username } })
    setUsername('')
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <button type='submit'>create</button>
        </form>
    </div>
  )
}

RegisterForm.propTypes = {
  setError: PropTypes.func
}

export default RegisterForm