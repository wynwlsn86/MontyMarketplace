const express = require('express')
const soldItems = express.Router()
const { SoldItem, Apparal, User, Size } = require('../database/models')

soldItems.get('/', async (req, res) => {
	try {
		const soldItems = await SoldItem.findAll()
		res.send(soldItems)
	} catch (error) {
		throw error
	}
})

soldItems.put('/:item_id/', async (req, res) => {
	try {
		const itemQuantity = await Size.findAndCountAll({
			where: { apparal_id: req.params.item_id }
		})
		const item = await Apparal.findByPk(req.params.item_id, {
			include: [Size]
		})

		const prevSold = await SoldItem.findAndCountAll({
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
				name: req.body.name,
				product: name,
				email: req.body.email,
				phoneNumber: req.body.phoneNumber,
				itemId: id,
				profit: profitCalc,
				amntSold: amntSold
			}
			console.log(data)
			await SoldItem.update(data, {
				where: { userId: user.id }
			})
		}
	} catch (error) {
		throw error
	}
})

module.exports = soldItems
