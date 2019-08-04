const express = require('express')
const PurchaseRouter = express.Router()
const { Purchase, Apparel, User, Size } = require('../database/models')

PurchaseRouter.get('/', async (req, res) => {
	try {
		const purchases = await Purchase.findAll()
		res.send(purchases)
	} catch (error) {
		throw error
	}
})

PurchaseRouter.get('/totals', async (req, res) => {
	const usdFormatter = new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	})
	try {
		const purchases = await Purchase.findAll()
		const items = await Apparel.findAll()
		const resp = []
		for (let i = 0; i < items.length; i++) {
			// console.log(items[i].dataValues)
			let item = items[i].dataValues
			let profit = parseFloat(item.price) - parseFloat(item.cost)
			let data = { productName: item.name, profit: usdFormatter.format(profit) }
			resp.push(data)
		}
		res.send(resp)
	} catch (error) {
		throw error
	}
})

module.exports = PurchaseRouter
