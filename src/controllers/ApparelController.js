import { ApparelModel, CategoryModel } from '../database/Schema'

class ApparelController {
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
      const {
        apparel: {
          itemName,
          imageUrl,
          description,
          clearance,
          price,
          cost,
          brand
        },
        category: { attire, group, gender }
      } = req.body
      const data = {
        name: itemName,
        imageUrl: imageUrl,
        description: description,
        clearance: clearance,
        price: price,
        cost: cost,
        brand: brand,
        category: {
          attire: attire,
          group: group,
          gender: gender
        }
      }

      const apparel = await ApparelModel.create(data)
      const categoryGroup = await CategoryModel.findOne().where({
        group: group
      })
      const categoryAttire = await CategoryModel.findOne().where({
        attire: attire
      })
      if (!categoryGroup) {
        const newCategory = await CategoryModel.create({
          group: group,
          attire: [],
          gender: gender
        })
        await newCategory.save()
      }
      if (!categoryAttire) {
        const findCategoryGroup = await CategoryModel.findOne().where({
          group: group
        })
        await findCategoryGroup.update({
          attire: [...findCategoryGroup.attire, attire]
        })
      }
      await apparel.save()
      res.send('done')
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
