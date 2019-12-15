import { CategoryModel, ApparelModel } from '../database/Schema'

class CategoryController {
  async getCategory(req, res) {
    try {
      const category = await CategoryModel.find()
      res.send(category)
    } catch (error) {
      throw error
    }
  }

  async filterByCategory(req, res) {
    try {
      const categories = JSON.parse(req.params.data)

      await categories.forEach(async category => {
        const products = await ApparelModel.find({
          category: {
            attire: category.attire,
            group: category.group
          }
        })
        res.send(products)
      })
    } catch (error) {
      throw error
    }
  }

  async createCategory(req, res) {
    try {
      const newCategory = await CategoryModel.create(req.body)
      newCategory.save()
      res.send(newCategory)
    } catch (error) {
      throw error
    }
  }

  async updateCategory(req, res) {
    try {
      const category = await CategoryModel.findByIdAndUpdate(
        req.params.category_id,
        req.body,
        {
          useFindAndModify: false,
          new: true
        }
      )
      res.send(category)
    } catch (error) {
      throw error
    }
  }
}

export { CategoryController }
