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

module.exports = InventoryRouter
