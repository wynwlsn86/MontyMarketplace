const express = require('express')
const soldItems = express.Router()
const { Purchase, Apparal, User, Size } = require('../database/models')

soldItems.get('/', async (req, res) => {
	try {
		const soldItems = await SoldItem.findAll()
		res.send(soldItems)
	} catch (error) {
		throw error
	}
})

soldItems.post('/:item_id', async (req, res) => {
	try {
		const itemQuantity = await Size.findAndCountAll({
			where: { apparal_id: req.params.item_id }
		})

		const item = await Apparal.findByPk(req.params.item_id, {
			include: [Size]
		})

		const prevSold = await Purchase.findAndCountAll({
			where: { item_id: req.params.item_id }
		})

		const user = await User.findByPk(1)

		if (item) {
			const {
				dataValues: { id, price, name, buyerCost }
			} = item
			let newQuantity = itemQuantity.count - parseInt(req.body.quantity)
			let amntSold = parseInt(prevSold.count) + parseInt(req.body.quantity)
			let profitCalc = price - buyerCost
			const customer = req.body

			const data = {
				customerName: customer.customerName,
				productName: name,
				email: customer.email,
				phoneNumber: customer.phoneNumber,
				item_id: id,
				profit: profitCalc,
				quantity: amntSold
			}

			const newSold = await Purchase.create(data, {
				where: {
					itemId: req.params.item_id
				}
			})
			await newSold.setUser(user)
			res.send(newSold)
		}
	} catch (error) {
		throw error
	}
})

module.exports = soldItems
