import {
  ApparelModel,
  CategoryModel,
  SubCategoryModel
} from '../database/Schema'

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
      const newItem = new ApparelModel({
        ...req.body.item
      })
      await newItem.save()
      res.send(newItem)
    } catch (error) {
      throw error
    }
  }
  async updateItem(req, res) {
    try {
      // This is gonna be tricky to set up on the front end, we'll have to calcutale the total on the client side and then send it down like this:
      // {
      //   item: {
      //     "name": "New Item",
      //     "category_id": "5dfed576e10a27d66cae0fa6",
      //     "subCategory_id": "5dfed62f3911291ad3f64f8c",
      //     "details":{
      //       "size": "lg",
      //       "quantity": 50,
      //       "color": "green"
      //     }
      //   }
      // }
      const apparel = await ApparelModel.findOneAndUpdate(
        { _id: req.params.apparel_id },
        {
          $set: {
            'details.$[el]': req.body.item.details
          }
        },
        {
          // upsert: true,
          arrayFilters: [
            {
              'el.size': req.body.item.details.size,
              'el.color': req.body.item.details.color //if we want to get specific we have to pass the color down as well, but Jesse will have to make sure he inputs a color to begin with
            }
          ]
        }
      )
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
