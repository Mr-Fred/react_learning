import propTypes from 'prop-types';
import helpers from '../utilities/utilities';
import { Flag, Landmark, Earth, Speech, Clock9, Users , LandPlot, MapPinned, Map } from 'lucide-react';

const Country = ({ data }) => {
  const country = data[0];

  const population = helpers.formatPopulation(country.population);
  const area = helpers.formatArea(country.area);
  const borders = helpers.formatBorders(country.borders);
  const timezones = helpers.formatTimezones(country.timezones);
  const languages = helpers.formatLanguages(country.languages);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-hidden"> 
      {/* Header Section */}
      <div className="flex justify-center mb-4"> {/* Added justify-center */}
        {/* Display the flag image */}
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.common}`}
          className="w-full h-100 mb-4"
        /> 
      </div>
      <div className="flex items-center mb-4">
        <Flag  className="w-10 h-6 mr-2" /> {/* Replace with actual flag component or image */}
        <h2 className="text-xl font-bold"><span className="text-blue-500 font-bold">{country.official}</span></h2>
      </div>

      {/* Main Content Section - Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <div className="flex items-center mb-2">
            <Landmark size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-orange-500 uppercase">Capital:</span> {country.capital}</p>
          </div>
          <div className="flex items-center mb-2">
            <Earth size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-orange-500 uppercase">Region:</span> {country.region}</p>
          </div>
          <div className="flex items-center mb-2">
            <MapPinned size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-orange-500 uppercase">Subregion:</span> {country.subregion}</p>          </div>
        </div>
          {/* Right Column */}
        <div>
          <div className="flex items-center mb-2">
            <Users size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-purple-500 uppercase">Population:</span> {population}</p>          </div>
          <div className="flex items-center mb-2">
            <Map size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-purple-500 uppercase">Area:</span> {area}</p>
          </div>
          <div className="flex items-center mb-2">
            <Speech size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-purple-500 uppercase">Languages:</span> {languages}</p>          </div>
        </div>
        </div>
        {/* Additional Details Section */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <LandPlot size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-indigo-500 uppercase">Borders:</span> {borders}</p>          </div>
          <div className="flex items-center">
            <Clock9 size={18} className="text-gray-500 mr-2" />
            <p><span className="font-medium text-indigo-500 uppercase">Timezones:</span> {timezones}</p>          </div>
        </div>
      </div>
    );
  };

  Country.propTypes = {
    data: propTypes.array.isRequired,
  };
  export default Country;