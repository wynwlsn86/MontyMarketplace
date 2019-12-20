import { PhoneImageModel, PhoneModel } from '../database/Schema'

class PhoneController {
  async getPhones(req, res) {
    try {
      await PhoneModel.find()
        .populate('imageUrl')
        .exec((err, phones) => {
          if (err) res.status(400).send({ error: 'Image Not found' })
          res.send(phones)
        })
    } catch (error) {
      throw error
    }
  }

  async getPhoneById(req, res) {
    try {
      const phones = await PhoneModel.findById(req.params.phone_id)
      res.send(phones)
    } catch (error) {
      throw error
    }
  }

  async addPhone(req, res) {
    try {
      const phone = await PhoneModel.create(req.body)
      await phone.save()
      res.send(phones)
    } catch (error) {
      throw error
    }
  }

  async addPhoneImage(req, res) {
    try {
      const image = await PhoneImageModel.create(req.body)
      await image.save()
      res.send(image)
    } catch (error) {
      throw error
    }
  }

  async updatePhone(req, res) {
    try {
      const phone = await PhoneModel.findByIdAndUpdate(
        req.params.item_id,
        req.body,
        {
          useFindAndModify: false,
          new: true
        }
      )
      res.send(phone)
    } catch (error) {
      throw error
    }
  }

  async deletePhone(req, res) {
    try {
      await PhoneModel.findOneAndDelete(req.params.item_id)
      res.send({ msg: `Item ${req.params.item_id} was deleted!` })
    } catch (error) {
      throw error
    }
  }
}

export { PhoneController }
