import propTypes from 'prop-types';
import helpers from '../utilities/utilities';
import {Flag, Landmark, Earth , Star, Clock9, LandPlot, MapPinned, Map } from 'lucide-react';

const Country = ({ data }) => {
  const country = data[0];
  const population = helpers.formatPopulation(country.population);
  const area = helpers.formatArea(country.area);
  const borders = helpers.formatBorders(country.borders);
  const timezones = helpers.formatTimezones(country.timezones);
  const languages = helpers.formatLanguages(country.languages);

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col">
      <div className="flex flex-shrink-0 m-3 justify-center items-center">
        <img
          src={country.flagPng}
          alt={`${country.common} flag`}
          className="w-full h-48"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent"></div> */}
        </div>
      <div className="flex flex-col p-6">
        <h2 className="text-xl font-bold text-gray-800">{country.official}</h2>
        <div className="mt-3 flex flex-wrap space-x-5 space-y-2">
          <div className="flex items-center space-x-1">
            <Landmark size={20} className="text-blue-500" />
      
            <p className="text-base font-medium text-gray-700">
              Capital: {country.capital}
            </p>
          </div>

          <div className="flex items-center space-x-1">
            <Flag size={20} className="text-blue-500" />
           
            <p className="text-base font-medium text-gray-700">
              Region: {country.region}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <MapPinned size={20} className="text-blue-500" />
            
            <p className="text-base font-medium text-gray-700">
              Subregion: {country.subregion}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap space-x-5 space-y-2">
          <div className="flex items-center space-x-1">
            <Earth size={20} className="text-blue-500" />
           
            <p className="text-base font-medium text-gray-700">
              Population: {population}
            </p>
          </div>

          <div className="flex items-center space-x-1">
            <Map size={20} className="text-blue-500" />
          
            <p className="text-base font-medium text-gray-700">
              Area: {area}
            </p>
          </div>

          <div className="flex items-center space-x-1">
            <Star size={20} className="text-blue-500" />
           
            <p className="text-base font-medium text-gray-700">
              Languages: {languages}
            </p>
          </div>

          <div className="flex items-center space-x-1">
            <LandPlot lock9 size={20} className="text-blue-500" />
          
            <p className="text-base font-medium text-gray-700">
              Borders: {borders}
            </p>
          </div>

          <div className="flex items-center space-x-1">
            <Clock9 size={20} className="text-blue-500" />
        
            <p className="text-base font-medium text-gray-700">
              Timezones: {timezones}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



Country.propTypes = {
  data: propTypes.array
}

export default Country
