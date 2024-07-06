import axios from "axios";

const baseUrl = "http://localhost:3001/phonebook";


const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewContact = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateContact = (id, contactObject) => {
  const request = axios.put(`${baseUrl}/${id}`, contactObject)
  return request.then(response => response.data)
}


export default { getAllContacts, addNewContact, deleteContact, updateContact}