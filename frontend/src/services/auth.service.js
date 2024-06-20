import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const LoginService = async (payload) => {
  return await axios.post(`${BASE_URL}/auth/login`, payload);
};
