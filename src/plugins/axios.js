import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
})

export default apiClient
