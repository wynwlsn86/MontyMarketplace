import Api from '../config'
import { __SetToken } from './TokenServices'

export default class AuthService {
  login = async data => {
    try {
      const resp = await Api.post('/auth/login', data)
      __SetToken(resp.data.token)
      return resp
    } catch (error) {
      throw error
    }
  }
  createCategory = async category => {
    try {
      const resp = await Api.post('/categories', {
        category: { name: category }
      })
      return resp.data
    } catch (error) {
      throw error
    }
  }

  addItemToInventory = async item => {
    try {
      const resp = await Api.post('/apparel', { item: item })
      return resp
    } catch (error) {
      throw error
    }
  }
}
