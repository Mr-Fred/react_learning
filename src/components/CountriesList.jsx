import React from 'react'
import propTypes from 'prop-types'

function CountriesList({countriesName}) {
  
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Countries</h1>
      { 
      countriesName.length < 1 
      ? (<p className='text-center'>Search a country name to view its Informations</p>)
      : countriesName.length > 10 
      ? (<p>Too many results, please refine your search</p>)
      : <ul>
      {countriesName.map((country) => (
        <li 
            key={country} 
            className="text-center p-2 m-2 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
        >
            {country}
        </li>
     
      ))}
    </ul>
      
    } 
    </>
    
  )
}

CountriesList.propTypes = {
  countriesName: propTypes.array.isRequired
}

export default CountriesList
