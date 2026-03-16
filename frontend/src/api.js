// frontend/src/api.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g., http://localhost:5000/api
});

// Automatically attach JWT to all requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: response interceptor to handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to registration or login...");
      // Optionally, clear invalid token
      localStorage.removeItem("token");
      // You could redirect user here if needed
    }
    return Promise.reject(error);
  }
);

export default api;