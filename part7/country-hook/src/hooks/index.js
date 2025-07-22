import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry =  (name) => {
  const [country, setCountry] = useState(null)

  useEffect(  () => {
   async function fetchData() {
    try {
      const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`

      const response = await axios.get(baseUrl)
      console.log(response.data)
      setCountry({ data: response.data, found: true })
    } catch (e) {
      setCountry({ found: false })
    }
   }
   fetchData()
  }, [name])

  return country
}
