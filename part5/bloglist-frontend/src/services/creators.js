import axios from 'axios'

const baseUrl = '/api/creators'

export const fetchCreators = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const fetchCreatorById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export const fetchCreatorByName = async (name) => {
  const response = await axios.get(`${baseUrl}?name=${name}`)
  return response.data
}

export const createCreator = async (newCreator) => {
  const response = await axios.post(baseUrl, newCreator)
  return response.data
}

export const updateCreator = async (updatedCreator) => {
  const response = await axios.put(`${baseUrl}/${updatedCreator.id}`, updatedCreator)
  return response.data
}

export const removeCreator = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}