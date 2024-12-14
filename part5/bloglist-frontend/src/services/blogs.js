import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try{
    const request = await axios.get(baseUrl, config)
    return request.data
  } catch (error) {
    return error
  }
}

const create = async (newBlog) => {

  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  };

  try {
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {

  const config = {
    headers: { Authorization: token }
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export default { getAll, setToken, create, update, remove }