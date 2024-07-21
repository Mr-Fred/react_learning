import axios from "axios";

function getAllCountries(){
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    const request = axios.get(url)
    return request.then(response => {
            // console.log(response.data)
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}

function getCountry(query){
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

    const request = axios.get(baseUrl + query)
    return request.then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

export default {
    getCountry,
    getAllCountries
};