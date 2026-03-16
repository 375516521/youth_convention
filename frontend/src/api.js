// frontend/src/api.js
import axios from "axios";

// Point baseURL to youth routes
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/youth", // e.g., http://localhost:5000/api/youth
});

// Automatically attach admin key if it exists in localStorage
api.interceptors.request.use(
  (config) => {
    const adminKey = localStorage.getItem("adminKey");
    if (adminKey) {
      config.headers["x-admin-key"] = adminKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: globally handle 403 for invalid admin key
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn("Admin key invalid or missing");
      localStorage.removeItem("adminKey"); // remove invalid key
      alert("Admin key invalid. Please refresh and enter correct key.");
    }
    return Promise.reject(error);
  }
);

export default api;