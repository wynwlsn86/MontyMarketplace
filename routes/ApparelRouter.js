const express = require('express')
const ApparelRouter = express.Router()
const { Apparel, Attribute, Category } = require('../database/models')

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
		const {
			name,
			brand,
			price,
			cost,
			description,
			clearance,
			imageUrl
		} = req.body.item
		const items = await Apparel.findOrCreate({
			raw: true,
			where: {
				name: name,
				brand: brand,
				price: price,
				cost: cost,
				description: description,
				clearance: clearance,
				imageUrl: imageUrl
			}
		})

		if (items) {
			const { id } = items[0]
			const item = await Apparel.findByPk(id)
			const categories = await Category.findOrCreate({
				where: {
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
			await item.addCategory(categories[0])
			await item.addAttribute(attributes[0])
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
