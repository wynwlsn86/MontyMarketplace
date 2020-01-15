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
      const resp = await Api.post('/categories', category)
      return resp
    } catch (error) {
      throw error
    }
  }

  addItemToInventory = async item => {
    try {
      const resp = await Api.post('/apparel', { item })
      return resp
    } catch (error) {
      throw error
    }
  }

  removeCategory = async id => {
    try {
      const resp = await Api.delete(`/categories/${id}`)
      return resp
    } catch (error) {
      throw error
    }
  }
}
