import {
  ApparelModel,
  CategoryModel,
  SubCategoryModel
} from '../database/Schema'

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
      const category = await CategoryModel.findOneAndUpdate(
        {
          name: req.body.category.name,
          gender: req.body.category.gender
        },
        req.body.category,
        { upsert: true }
      )
      const newItem = new ApparelModel({
        ...req.body.item,
        category_id: category._id
      })
      await newItem.save()
      res.send(newItem)
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
