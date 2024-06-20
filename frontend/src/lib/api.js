import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export default api;
