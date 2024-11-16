import axios from "axios";

const baseUrl = "/api/phonebook";


const getAllContacts = async () => {
  const request = axios.get(baseUrl)
  const response = await request;
  return response.data;
}

const addNewContact = async (newContact) => {
  const request = axios.post(baseUrl, newContact)
  const response = await request;
  return response.data;
}

const deleteContact = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request;
  return response.data;
}

const updateContact = async (id, contactObject) => {
  const request = axios.put(`${baseUrl}/${id}`, contactObject)
  const response = await request;
  return response.data;
}

export default { getAllContacts, addNewContact, deleteContact, updateContact}