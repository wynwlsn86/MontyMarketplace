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

CategoryRouter.post('/', async (req, res) => {
	try {
		const newCategory = await Category.create(req.body)
		newCategory.save()
		res.send(newCategory)
	} catch (error) {
		throw error
	}
})

module.exports = CategoryRouter
