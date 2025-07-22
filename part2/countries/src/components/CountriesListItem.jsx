import propTypes from 'prop-types'

function CountriesListItem({country, handleClick}) {
  
  return (
    <>
      <li 
        className="text-center p-2 m-2 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={
          () => {
            handleClick(country)
          }
        }
        >
        {country}
      </li>
    </>
    
  )
}

CountriesListItem.propTypes = {
  country: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired
}

export default CountriesListItem
