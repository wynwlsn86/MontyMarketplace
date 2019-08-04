const express = require('express')
const PurchaseRouter = express.Router()
const { Purchase, Apparel, User, Size } = require('../database/models')

const usdFormatter = new Intl.NumberFormat('en-us', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})

PurchaseRouter.get('/', async (req, res) => {
	try {
		const purchases = await Purchase.findAll()
		res.send(purchases)
	} catch (error) {
		throw error
	}
})

PurchaseRouter.get('/totals/:item_id', async (req, res, next) => {
	try {
		const items = await Apparel.findByPk(req.params.item_id)
		const purchases = await Purchase.findAndCountAll({
			where: { item_id: req.params.item_id }
		})
		if (items && purchases) {
			const item = items.dataValues
			let multiple = purchases.count
			let profit = (parseFloat(item.price) - parseFloat(item.cost)) * multiple
			let data = {
				productName: item.name,
				itemPrice: usdFormatter.format(item.price),
				itemCost: usdFormatter.format(item.cost),
				profit: usdFormatter.format(profit),
				purchases: multiple
			}
			res.send(data)
		} else {
			let err = new Error('Item not found')
			return res.status(400).json({ err: err.toString() })
		}
	} catch (error) {
		throw error
	}
})

module.exports = PurchaseRouter
