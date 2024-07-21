
function extractCountryInfo(data){
    return data.map(country => (
        {
            official: country.name.official,
            common: country.name.common,
            nativeNamme: country.name.nativeName,
            capital: country.capital,
            region: country.region,
            subregion: country.subregion,
            population: country.population,
            area: country.area,
            currencies: country.currencies,
            languages: country.languages,
            flags: country.flags,
            borders: country.borders,
            flagPng: country.flags.png,
            coatOfArms: country.coatOfArms.png,
            startOfWeek: country.startOfWeek,
            timezones: country.timezones,
        }
    ))
}

function formatPopulation(population) {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)}K`;
    } else {
      return population.toString();
    }
}
  
function formatArea(area) {
  
  if (area >= 1000000) {
      return `${(area / 1000000).toFixed(1)}M km²`;
  } else if (area >= 1000) {
      return `${(area / 1000).toFixed(1)}K km²`;
  } else {
      return `${area} km²`;
  }
}

function formatBorders(borders) {
  if(!borders){
    return "No bordering countries";
  }

  if (borders.length === 0) {
    return "No bordering countries";
  } else {
    return borders.join(", ");
  }
}


function formatTimezones(timezones) {
  if(!timezones){
    return "No timezones available";
  }

  if (timezones.length === 0) {
    return "No timezones available";
  } else {
    return timezones.join(", ");
  }
}

function formatLanguages(languages) {
  if(!languages){
    return "No languages available";
  }
  if (Object.keys(languages).length === 0) {
    return "No languages available";
  } else {
    const languageNames = Object.values(languages).join(", ");
    return languageNames;
  }
}
  
export default {
    extractCountryInfo,
    formatPopulation,
    formatArea,
    formatBorders,
    formatTimezones,
    formatLanguages
}