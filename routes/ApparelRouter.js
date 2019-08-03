const express = require('express')
const ApparelRouter = express.Router()
const {
	User,
	Apparel,
	ApparelSize,
	ApparelCategory,
	Purchase
} = require('../database/models')

ApparelRouter.get('/', async (req, res) => {
	try {
		const items = await Apparel.findAll({
			include: [{ all: true }]
		})
		res.send(items)
	} catch (error) {
		throw error
	}
})

ApparelRouter.put('/:item_id', async (req, res) => {
	try {
		const updateItem = await Apparel.update({
			where: {
				id: req.params.item_id
			}
		})
		res.send(updateItem)
	} catch (error) {
		throw error
	}
})

ApparelRouter.post('/', async (req, res) => {
	try {
		const item = await Apparel.create(req.body.item)

		const newCategory = await ApparelCategory.findOrCreate({
			where: { category: req.body.category.category }
		})
		console.log(newCategory[0])
		if (item) {
			await newCategory[0].apparelCategory.dataValues.setApparel(item)
			// await item.addColor(color)
		}
	} catch (error) {
		console.log('error', error)
		// throw error
	}
})

module.exports = ApparelRouter
