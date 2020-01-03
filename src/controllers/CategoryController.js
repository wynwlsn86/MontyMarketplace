import {
  CategoryModel,
  ApparelModel,
  SubCategoryModel
} from '../database/Schema'

class CategoryController {
  constructor() {
    this.items = []
  }
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

  async getItemsByCategory(req, res) {
    try {
      const params = JSON.parse(req.params.subCategory_id)
      let items = []
      for (let i = 0; i < params.length; i++) {
        const apparel = await ApparelModel.find({
          subCategory_id: params[i]
        })
        items.push(...apparel)
      }
      res.send(items)
    } catch (error) {
      throw error
    }
  }

  async createCategory(req, res) {
    try {
      await CategoryModel.findOneAndUpdate(
        {
          name: req.body.category.name,
          gender: req.body.category.gender
        },
        { ...req.body.category },
        { upsert: true },
        (err, doc) => {
          if (err) throw err
          res.send(doc)
        }
      )
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
  async deleteCategory(req, res) {
    try {
      await CategoryModel.findById(req.params.category_id)
        .populate('subCategories')
        .exec(async (err, data) => {
          if (err) throw error
          await CategoryModel.deleteOne({ _id: data._id })
          data.subCategories.forEach(
            async sub => await SubCategoryModel.deleteOne({ _id: sub._id })
          )
        })
    } catch (error) {
      throw error
    }
  }
}

export { CategoryController }
