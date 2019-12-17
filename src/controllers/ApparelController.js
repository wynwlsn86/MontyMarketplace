import {
  ApparelModel,
  CategoryModel,
  SubCategoryModel
} from '../database/Schema'
import { CategoryController } from './CategoryController'

class ApparelController {
  constructor() {
    this.createItem = this.createItem
  }
  createItem = async (req, res, params) => {
    try {
      const newItem = new ApparelModel({
        ...params.item,
        group: params.category._id,
        attire: params.subCategory._id
      })
      return newItem
    } catch (error) {
      throw error
    }
  }
  async getApparel(req, res) {
    try {
      const apparel = await ApparelModel.find()
      res.send(apparel)
    } catch (error) {
      throw error
    }
  }
  async getApparelByBrand(req, res) {
    try {
      const apparel = await ApparelModel.find().where({
        brand: req.params.brand
      })
      res.send(apparel)
    } catch (error) {
      throw error
    }
  }
  async getItemById(req, res) {
    try {
      const apparel = await ApparelModel.findById(req.params.apparel_id)
      res.send(apparel)
    } catch (error) {
      throw error
    }
  }

  async addItem(req, res) {
    try {
      const { item, subCategory, category } = req.body
      const categoryInstance = new CategoryController()
      const subCategoryQuery = await SubCategoryModel.findOne({
        name: subCategory.name
      })
      const categoryQuery = await CategoryModel.findOne({
        name: category.name,
        gender: category.gender
      })
      const apparelQuery = await ApparelModel.findOne({ name: item.name })
      if (apparelQuery) {
        res.status(400).send({ message: 'This item exists' })
      } else {
        if (subCategoryQuery && categoryQuery) {
          const newItem = new ApparelModel({
            ...item,
            group: category._id,
            attire: subCategory._id
          })
          await newItem.save()
          res.send(newItem)
        } else if (!subCategoryQuery && !categoryQuery) {
          let newItem = await this.createItem(req, res, {
            item,
            subCategory: await categoryInstance.createSubCategory(
              { body: { subCategory } },
              res
            ),
            category: await categoryInstance.createCategory(
              { body: { category } },
              res
            )
          })
          await newItem.save()
          res.send(newItem)
        } else if (categoryQuery && !subCategoryQuery) {
          let newItem = await this.createItem(req, res, {
            item,
            subCategory: await categoryInstance.createSubCategory(
              { body: { subCategory } },
              res
            ),
            category: categoryQuery._id
          })
          await newItem.save()
          res.send(newItem)
        } else {
          let newItem = await this.createItem(req, res, {
            item,
            subCategory: subCategoryQuery._id,
            category: await categoryInstance.createCategory(
              { body: { category } },
              res
            )
          })
          await newItem.save()
          res.send(newItem)
        }
      }
    } catch (error) {
      throw error
    }
  }
  async updateItem(req, res) {
    try {
      const apparel = await ApparelModel.findByIdAndUpdate(
        req.params.apparel_id,
        req.body.item,
        {
          useFindAndModify: false,
          new: true
        }
      )
      await apparel.save()
      res.send(apparel)
    } catch (error) {
      throw error
    }
  }
  async removeItem(req, res) {
    try {
      await ApparelModel.findOneAndDelete(req.params.apparel_id)
      res.send({ msg: `Item ${req.params.item_id} was deleted!` })
    } catch (error) {
      throw error
    }
  }
}

export { ApparelController }
