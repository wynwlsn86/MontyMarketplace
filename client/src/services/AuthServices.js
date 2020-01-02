import Api from '../config'
import { __SetToken } from './TokenServices'

export default class AuthService {
  login = async data => {
    try {
      const resp = await Api.post('/auth/login', data)
      __SetToken(resp.data.token)
      return resp.data
    } catch (error) {
      throw error
    }
  }
}
