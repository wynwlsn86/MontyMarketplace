import {
  CategoryModel,
  ApparelModel,
  SubCategoryModel
} from '../database/Schema'

class CategoryController {
  constructor() {
    this.createCategory = this.createCategory.bind(this)
    this.createSubCategory = this.createSubCategory.bind(this)
  }

  async getCategory(req, res) {
    try {
      const category = await CategoryModel.find()
      res.send(category)
    } catch (error) {
      throw error
    }
  }

  async getCategoryByDepartment(req, res) {
    try {
      const category = await CategoryModel.findOne().where(
        req.query.name ? { name: req.query.name } : { gender: req.query.gender }
      )
      const items = await ApparelModel.find().where({
        category: {
          group: category._id
        }
      })
      res.send(items)
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
      const newCategory = new CategoryModel(req.body.category)
      newCategory.save()
      return newCategory
    } catch (error) {
      throw error
    }
  }

  async createSubCategory(req, res) {
    try {
      const newSubCategory = new SubCategoryModel(req.body.subCategory)
      await newSubCategory.save()
      return newSubCategory
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
