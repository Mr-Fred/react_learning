import React from 'react'
import propType from 'prop-types'

function SearchBar({query, setQuery, handleSearch}) {
  return (
    <div className='relative'>
      <input 
      type="text"
      id='query'
      value={query}
      onChange={e => {
        setQuery(e.target.value)
        handleSearch(query)
      }}
      placeholder="Search for a country..."
      className="w-full p-2 border border-gray-300 rounded-md"
      />
      {/* <button
        type="button"
        onClick={handleSearch}
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
      > */}
        {/* <span role="img" aria-label="search">🔍</span>
      </button> */}
    </div>
  )
}

SearchBar.prototype = {
  query: propType.string,
  setQuery: propType.func,
  handleSearch: propType.func
}

export default SearchBar