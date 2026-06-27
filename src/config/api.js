import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5000/api",
  //baseURL: "http://18.171.221.21:5000/api",
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  

});

//"http://18.171.221.21:5000/api",
// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;