import { useState } from 'react'
import { useQuery } from '@apollo/client'

// Ui components
import Persons from './components/Persons'
import AddPersonForm from './components/AddPersonForm'
import Notifier from './components/Notifier'
import PhoneForm from './components/PhoneForm'

// Queries
import { ALL_PERSONS } from './services/queries'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, {})

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifier errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <AddPersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App