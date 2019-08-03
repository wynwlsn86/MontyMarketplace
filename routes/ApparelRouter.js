const express = require('express')
const ApparelRouter = express.Router()
const {
	User,
	Apparel,
	Attribute,
	Category,
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
		const attributeData = {
			color: req.body.attributes.color.toLowerCase(),
			size: req.body.attributes.size.toLowerCase()
		}
		const categoryData = {
			category: req.body.category.category.toLowerCase()
		}
		const attributes = await Attribute.create(attributeData)
		const categories = await Category.create(categoryData)

		if (categories && attributes) {
			attributes.setApparel(item)
			categories.setApparel(item)
		}
		res.send(item)
	} catch (error) {
		throw error
	}
})

module.exports = ApparelRouter
