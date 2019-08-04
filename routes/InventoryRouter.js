const express = require('express')
const InventoryRouter = express.Router()
const { Apparel, Category, Attribute } = require('../database/models')

InventoryRouter.get('/', async (req, res) => {
	try {
		const items = await Apparel.findAll({ include: [{ all: true }] })

		const iventory = []

		for (let i = 0; i < items.length; i++) {
			// console.log(items[i])
			const item = items[i].dataValues
			const inventory = await Attribute.findAndCountAll({
				where: { apparel_id: item.id }
			})
			console.log(inventory)
		}
		res.send(items)
	} catch (error) {
		throw error
	}
})

module.exports = InventoryRouter
