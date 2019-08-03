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
		const items = await Apparel.findOrCreate({
			where: { name: req.body.item.name }
		})
		if (items) {
			await items.forEach(async (item) => {
				const {
					dataValues: { id }
				} = item
				const categories = await Category.findOrCreate({
					where: {
						apparel_id: id,
						category: req.body.category.category
					}
				})

				const attributes = await Attribute.findOrCreate({
					where: {
						apparel_id: id,
						color: req.body.attributes.color,
						size: req.body.attributes.size
					}
				})
				attributes.forEach(
					async (attribute) => await attribute.setApparel(item)
				)
				categories.forEach(async (category) => await category.setApparel(item))
			})
		}
		res.send(items)
	} catch (error) {
		throw error
	}
})

ApparelRouter.delete('/:item_id', async (req, res) => {
	try {
		await Apparel.destroy({ where: { id: req.params.item_id } })
		await Attribute.destroy({
			where: {
				apparel_id: req.params.item_id
			}
		})
		await Category.destroy({
			where: {
				apparel_id: req.params.item_id
			}
		})
		res.send({ msg: 'Item Removed' })
	} catch (error) {
		throw error
	}
})

module.exports = ApparelRouter
