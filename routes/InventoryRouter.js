const express = require('express')
const InventoryRouter = express.Router()
const { Apparel, Category, Phone } = require('../database/models')

InventoryRouter.get('/', async (req, res) => {
	try {
		const apparel = await Apparel.find()
		const phone = await Phone.find()
		const inventory = apparel.map((item) => {
			const data = {
				id: item._id,
				name: item.name,
				brand: item.brand,
				price: item.price,
				cost: item.cost,
				imageUrl: item.imageUrl,
				description: item.description,
				quantity: item.quantity || 0
			}
			return data
		})
		res.send(inventory)
	} catch (error) {
		throw error
	}
})

// query route, format endpoint as such /categories?=query
InventoryRouter.get('/categories', async (req, res) => {})

module.exports = InventoryRouter
