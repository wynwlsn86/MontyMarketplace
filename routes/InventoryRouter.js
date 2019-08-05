const express = require('express')
const InventoryRouter = express.Router()
const { Apparel, Category, Attribute } = require('../database/models')

InventoryRouter.get('/', async (req, res) => {
	try {
		const items = await Apparel.findAll()
		let resp = []
		for (let j = 0; j < items.length; j++) {
			const attributes = await Attribute.findAndCountAll({
				where: { apparel_id: items[j].dataValues.id }
			})
			let data = { quantity: attributes.count, item: attributes.rows[0] }
			resp.push(data)
		}
		res.send(resp)
	} catch (error) {
		throw error
	}
})

// query route, format endpoint as such /categories?=query
InventoryRouter.get('/categories', async (req, res) => {
	try {
		const categories = await Category.findAll({
			where: {
				category: req.query.category
			},
			include: [Apparel]
		})
		res.send(categories)
	} catch (error) {
		throw error
	}
})

module.exports = InventoryRouter
