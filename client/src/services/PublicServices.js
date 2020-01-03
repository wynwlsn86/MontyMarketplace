import Api from '../config'

export default class PublicService {
  getProducts = async () => {
    try {
      const resp = await Api.get('/apparel')
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getCategories = async () => {
    try {
      const resp = await Api.get('/categories')
      const categories = resp.data.map(category => {
        const data = {
          ...category,
          isChecked: false,
          toAdd: false,
          subCategories: category.subCategories.map(subCategory => {
            const data = {
              ...subCategory,
              isChecked: false
            }
            return data
          })
        }
        return data
      })
      return categories
    } catch (error) {
      throw error
    }
  }

  getProduct = async id => {
    try {
      const resp = await Api.get(`/apparel/${id}`)
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getPhones = async () => {
    try {
      const resp = await Api.get('/phones')
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getPhone = async id => {
    try {
      const resp = await Api.get(`/phones/${id}`)
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getInventory = async () => {
    try {
      const resp = await Api.get('/inventory')
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getOrders = async () => {
    try {
      const orders = await Api.get('/orders')
      return orders.data
    } catch (error) {
      throw error
    }
  }

  getCustomers = async () => {
    try {
      const resp = await Api.get('/orders/customers')
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getProductsByCategory = async categories => {
    try {
      const resp = await Api.get(
        `/categories/department/${JSON.stringify(categories)}`
      )
      return resp.data
    } catch (error) {
      throw error
    }
  }

  addProduct = async data => {
    try {
      const resp = await Api.post('/apparel', { apparel: data })
      return resp
    } catch (error) {
      throw error
    }
  }
}
