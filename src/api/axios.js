import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';
export const loginApi = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;