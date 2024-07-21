
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

export default {
    extractCountryInfo
}