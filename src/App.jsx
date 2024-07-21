import { useState, useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CountriesList from "./components/CountriesList";

import countries from "./api/countries";
import helpers from './utilities/utilties'

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState([])

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

  const countriesName = useMemo(
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
          countriesName,
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
        <CountriesList countriesName={searchResults}/>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-500 p-4 text-white text-center text-sm">
        <p>&copy; 2023 Fred</p>
      </footer>

    </div>
  );
};

export default App;
