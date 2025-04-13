import propTypes from 'prop-types';

const Contacts = ({phonebook, deletePerson}) => {
  return (
    <div className='border-b-2 border-gray-700'>
    <h2 className="text-xl font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-2">
      Contacts
    </h2>
    <ul className='list-none p-0'>
    {phonebook.map(person => 
      <li key={person.id} className="bg-gray-800 p-3 rounded-md mb-2 flex items-center justify-between">
      <div className="flex-start flex items-center space-x-5"> 
        <span className="text-lg font-medium text-white">{person.name}:</span> 
        <span className="text-base text-gray-300">{person.number}</span>
      </div>
      <button
        className='px-3 border border-transparent hover:bg-red-500 hover:text-white rounded-md text-red-700 focus:outline-none'
        onClick={() => deletePerson(person.id, person.name)}
      >
        Delete
      </button>
    </li>
    )}
    </ul>
  </div>
  )
}

Contacts.propTypes = {
  phonebook: propTypes.array.isRequired,
  deletePerson: propTypes.func.isRequired,
}

export default Contacts