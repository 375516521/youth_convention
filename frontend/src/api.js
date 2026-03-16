import axios from "axios";

// Point baseURL directly to youth routes
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/youth", // e.g., http://localhost:5000/api/youth
});

// Automatically attach JWT token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;