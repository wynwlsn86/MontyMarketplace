const express = require('express')
const phoneRouter = express.Router()
const { Phone, User } = require('../database/models')
const { PhoneData } = require('../database/PhoneData')
phoneRouter.post('/:user_id/inventory/add', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.user_id)
		if (user) {
			for (let i = 0; i < PhoneData; i++) {
				await Phone.create({
					brand: PhoneData[i].brand,
					imageURL: PhoneData[i].imageURL,
					modelNumber: PhoneData[i].modelNumber,
					storage: PhoneData[i].storage,
					quantity: 100,
					condition: PhoneData[i].condition,
					carrier: PhoneData[i].carrier,
					amntSold: 0
				})
				await PhoneData[i].setUser(user)
			}
			res.send(user)
		}
	} catch (error) {
		throw error
	}
})

module.exports = phoneRouter
