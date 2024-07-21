import { useState, useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CountriesListItem from "./components/CountriesListItem";
import Country from "./components/Country";

import countries from "./api/countries";
import helpers from './utilities/utilities'

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showCountry, setShowCountry] = useState({
    show: false,
    data: [{}]
  });


  // Use useEffect to fetch data from the API. This will run when the component mounts.
  useEffect(
    () => {
      countries.getAllCountries()
        .then(
          (res) => setData(res)
        )
        .catch(
          (err) => console.log(err)
        )
    },
    []
  )

  const countriesData = useMemo(
    () => helpers.extractCountryInfo(data),
    [data]
  );

  // add a delay between search requests to avoid unnecessary calls
  const handleSearch = useDebouncedCallback((searchTerm) => {

    // fuzzy matching to get more accurate results
    if(!searchTerm) {
      setSearchResults([]);
      return;
    } else {
      const fuse = new Fuse(
          countriesData,
          {
            keys: ['official', 'common', 'capital', 'nativeName'],
            threshold: 0.1,
            maxPatternLength: 32,
            minMatchCharLength: 3,
          }
      );
      setSearchResults(
        fuse.search(searchTerm).map(result => result.item.official)
      );
    }
  }, 200);

  const showCountryData = (countryName) => {
    setShowCountry({
      ...showCountry,
      show: true,
      data: countriesData.filter(
        country => country.official === countryName
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Overall layout */}

      {/* Header Section */}
      <header className="bg-blue-500 p-4 text-white text-center"> 
        <h1 className="text-2xl font-bold">Country Information App</h1>
      </header>

      {/* Search Bar Section */}
      <section className="p-4">
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      </section>

      {/* Results Section */}
      <section className="flex-grow p-4"> 
      {/* Results will be displayed here */}
        { 
          searchResults.length < 1 
            ? (<p className='text-center'>Search a country name to view its Informations</p>)
            : searchResults.length === 1
            ? <Country data={countriesData.filter(
              country => country.official === searchResults[0]
            )}/>
            : searchResults.length > 10 
            ? (<p>Too many results, please refine your search</p>)
            : <ul>
            {searchResults.map((country) => (
              <CountriesListItem  key={country}  country={country} handleClick={showCountryData} />
            ))}
              </ul>
        }
      </section>
      <section className="flex-grow p-4">
        {
          showCountry.show && <Country data={showCountry.data}/>
        }
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-500 p-4 text-white text-center text-sm">
        <p>&copy; 2024 Fred</p>
      </footer>

    </div>
  );
};

export default App;
