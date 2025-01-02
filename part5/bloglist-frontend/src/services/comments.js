// service for getting and posting comments to the server
import axios from 'axios';

const baseUrl = '/api/blogs';

export const fetchComments = async (id, token) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}/comments`, config);
  return response.data;
};

export const addComment = async (id, token, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content: comment }, config);
  return response.data;
};

export const deleteComment = async (id, commentId, token) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}/comments/${commentId}`, config);
  return response.data;
};

export const updateComment = async (id, comment, token) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}/comments`, { content: comment }, config);
  return response.data;
};