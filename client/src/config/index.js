import Axios from 'axios'
import { __GetToken } from '../services/TokenServices'
const { REACT_APP_PRODUCTION } = process.env

const Api = Axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001/api'
      : REACT_APP_PRODUCTION,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

Api.interceptors.request.use(
  config => {
    const token = __GetToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export default Api
