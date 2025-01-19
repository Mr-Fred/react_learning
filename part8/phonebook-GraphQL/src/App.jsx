import { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

// Ui components
import Persons from './components/Persons'
import AddPersonForm from './components/AddPersonForm'
import Notifier from './components/Notifier'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

// Queries
import { ALL_PERSONS } from './services/queries'

// Helpers
import { updateCache } from './utils/helpers'


const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, {})
  useSubscription('PERSON_ADDED', {
    onData: ({data}) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} was added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if(!token) {
    return(
      <div>
      <Notifier errorMessage={errorMessage} />
      <h2>Login</h2>
      <LoginForm
        setToken={setToken}
        setError={notify}
      />
      <RegisterForm setError={notify}/>
    </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifier errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <AddPersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App