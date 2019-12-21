import {
  CategoryModel,
  ApparelModel,
  SubCategoryModel
} from '../database/Schema'

class CategoryController {
  async getCategory(req, res) {
    try {
      await CategoryModel.find()
        .populate('subCategories')
        .exec((err, data) => {
          res.send(data)
        })
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
        group: category._id
      })
      res.send(items)
    } catch (error) {
      throw error
    }
  }

  async getItemsByPrimaryCategory(req, res) {
    try {
      const items = await ApparelModel.find(
        req.query.category
          ? { category_id: req.query.category }
          : { sub_category_id: req.query.sub_category }
      )
      res.send(items)
    } catch (error) {
      throw error
    }
  }

  async createCategory(req, res) {
    try {
      const newSubCategory = new SubCategoryModel(req.body.subCategory)
      const newCategory = new CategoryModel({
        ...req.body.category,
        subCategories: newSubCategory._id
      })

      await newSubCategory.save()
      newCategory.save()
      res.send(newCategory)
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
