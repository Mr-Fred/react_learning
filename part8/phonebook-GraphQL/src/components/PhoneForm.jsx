import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'

// Queries
import { EDIT_NUMBER, ALL_PERSONS } from '../services/queries'

const PhoneForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [ changeNumber, result ] = useMutation(EDIT_NUMBER, {
    refetchQueries: [ { query: ALL_PERSONS } ],
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data, setError])

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}
PhoneForm.propTypes = {
  setError: PropTypes.func.isRequired
}

export default PhoneForm