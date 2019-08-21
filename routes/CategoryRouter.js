const express = require('express')
const CategoryRouter = express.Router()
const { Apparel, Category } = require('../database/models')

CategoryRouter.get('/', async (req, res) => {
	try {
		const category = await Category.find()
		res.send(category)
	} catch (error) {
		throw error
	}
})

CategoryRouter.get('/filter/:data', async (req, res) => {
	try {
		const categories = JSON.parse(req.params.data)

		await categories.forEach(async (category) => {
			const products = await Apparel.find({
				category: {
					attire: category.attire,
					group: category.group
				}
			})
			res.send(products)
		})
	} catch (error) {
		throw error
	}
})

CategoryRouter.post('/', async (req, res) => {
	try {
		const newCategory = await Category.create(req.body)
		newCategory.save()
		res.send(newCategory)
	} catch (error) {
		throw error
	}
})

CategoryRouter.put('/:category_id', async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.category_id,
			req.body,
			{
				useFindAndModify: false,
				new: true
			}
		)
		res.send(category)
	} catch (error) {
		throw error
	}
})

module.exports = CategoryRouter
