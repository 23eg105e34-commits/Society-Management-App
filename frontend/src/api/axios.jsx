import axios from "axios";

const API = axios.create({
  baseURL:
    "https://society-management-app-production-3b8b.up.railway.app/api",
});

// attach token automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;