import { useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'

// Queries
import { FIND_PERSON } from '../services/queries'

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street}, {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

Person.propTypes = {
  person: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    )
  }
  
  return (
    <div>
      <h2>Contacts</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>  
      )}
    </div>
  )
}

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
}

export default Persons
