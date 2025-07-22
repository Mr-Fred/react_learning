import axios from 'axios'

const baseUrl = '/api/blogs'


export const getAll = async (token) => {
  const config = {
    headers: { Authorization: token }
  }
  try{
    const request = await axios.get(baseUrl, config)
    return request.data
  } catch (error) {
    throw error
  }
}

export const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const update = async (updatedBlog, token) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id, token) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

