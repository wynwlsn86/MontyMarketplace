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
      const newCategory = await CategoryModel.findOneAndUpdate(
        {
          name: req.body.category.name
        },
        { ...req.body.category },
        { upsert: true }
      )
      res.send(newCategory)
    } catch (error) {
      throw error
    }
  }

  async createSubCategory(req, res) {
    try {
      const category = await CategoryModel.findOne({
        _id: req.params.category_id
      })
      const newSubCategory = new SubCategoryModel(req.body.subCategory)
      await category.updateOne({
        subCategories: [...category.subCategories, newSubCategory._id]
      })
      await newSubCategory.save()
      res.send({ category, newSubCategory })
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
