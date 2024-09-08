import axios, { type CreateAxiosDefaults } from 'axios'
import cookie from 'js-cookie'
import { EnumAccessTokenName } from '../types/teken.types'

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const axiosWithAuth = axios.create(options)
const axiosClassic = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = cookie.get(EnumAccessTokenName.accessToken)

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export { axiosWithAuth, axiosClassic }
