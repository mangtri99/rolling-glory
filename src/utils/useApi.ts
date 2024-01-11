import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_API_URL as string

export const useApi = axios.create({
  baseURL: BASE_URL,
})
