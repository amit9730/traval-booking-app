import axios from "axios";

// ❌ Pehle API_URL me "/api" tha isliye double "/api/api" ho raha tha
// ✔ Correct: direct backend base URL rakho
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL, 
  withCredentials: true,
});

// Token intercept karo agar login hai
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
