import React from 'react'

const Contacts = ({phonebook}) => {
  return (
    <div className='border-b-2 border-gray-700'>
    <h2 className="text-xl font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-2">
      Contacts
    </h2>
    <ul className='list-none p-0'>
    {phonebook.map(person => 
      <li key={person.name}
      className="bg-gray-800 p-3 rounded-md mb-2"
      >{person.name}: {person.number}
      </li>
    )}
    </ul>
  </div>
  )
}

export default Contacts