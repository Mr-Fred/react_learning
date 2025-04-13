import { useState, useEffect } from 'react'
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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  // fecth all resources
  useEffect(() => {
    const fetchAll = async () => {
      const config = {
        headers: { Authorization: token }
      }
      const response = await axios.get(baseUrl, config)
      setResources(response.data)
    }
    fetchAll()
  }, [baseUrl, token])

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token }
    }
    try {
      const response = await axios.post(baseUrl, resource, config)
      setResources([...resources, response.data])
    } catch (error) {
      throw new Error(error)
    }
  }

  const service = {
    create,
    setToken
  }

  return [
    resources, service
  ]
}