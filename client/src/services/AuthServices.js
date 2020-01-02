import Api from '../config'
import { __SetToken } from './TokenServices'

export default class AuthService {
  login = async data => {
    try {
      const resp = await Api.post('/auth/login', data)
      console.log(resp)
      __SetToken(resp.data.token)
      return resp
    } catch (error) {
      throw error
    }
  }
}
