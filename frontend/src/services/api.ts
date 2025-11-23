
import axios from "axios";

// it must begin with vite, the .env variable
export const apiURL = import.meta.env.VITE_BACKEND_API_URL

const api = axios.create({
  baseURL:apiURL
})

export default api;