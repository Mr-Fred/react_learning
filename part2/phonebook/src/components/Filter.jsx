import React from 'react'

const Filter = ({handleSearch, searchResults}) => {
  return (
    <div className='border-b-2 border-gray-700'>

        <label htmlFor="searchInput" className='text-sm font-medium text-gray-300 mb-2 pr-1'></label>
        <input
        type="text"
        placeholder="Search..."
        name="searchInput" id="searchInput"
        onChange={
            handleSearch
        }
        className="border-gray-700 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
    <div>
      {searchResults.length > 0 && (
      <ul>
        {searchResults.map(person => (
          <li key={person.name}>{person.name} - {person.number}</li>
        ))}
      </ul>
      )}
    </div>
  </div>
  )
}

export default Filter