const express = require('express')
const ApparelRouter = express.Router()
const { Apparel, Category, ItemDetail } = require('../database/models')

ApparelRouter.get('/', async (req, res) => {
	try {
		const apparel = await Apparel.find()
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.get('/brands/:brand', async (req, res) => {
	try {
		const apparel = await Apparel.find().where({
			brand: req.params.brand
		})
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.get('/:item_id', async (req, res) => {
	try {
		const apparel = await Apparel.findById(req.params.item_id)
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.post('/', async (req, res) => {
	try {
		const {
			apparel: { name, imageUrl, description, clearance, price, cost, brand },
			category: { attire, group, gender }
		} = req.body
		const data = {
			name: name,
			imageUrl: imageUrl,
			description: description,
			clearance: clearance,
			price: price,
			cost: cost,
			brand: brand,
			category: {
				attire: attire,
				group: group,
				gender: gender
			}
		}

		const apparel = await Apparel.create(data)
		const categoryGroup = await Category.findOne().where({
			group: group
		})
		const categoryAttire = await Category.findOne().where({
			attire: attire
		})
		if (!categoryGroup) {
			const newCategory = await Category.create({
				group: group,
				attire: [],
				gender: gender
			})
			await newCategory.save()
		}
		if (!categoryAttire) {
			const findCategoryGroup = await Category.findOne().where({
				group: group
			})
			await findCategoryGroup.update({
				attire: [...findCategoryGroup.attire, attire]
			})
		}
		await apparel.save()
		res.send('done')
	} catch (error) {
		throw error
	}
})

ApparelRouter.put('/:item_id', async (req, res) => {
	try {
		const apparel = await Apparel.findByIdAndUpdate(
			req.params.item_id,
			req.body.item,
			{
				useFindAndModify: false,
				new: true
			}
		)
		await apparel.save()
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.delete('/:item_id', async (req, res) => {
	try {
		await Apparel.findOneAndDelete(req.params.item_id)
		res.send({ msg: `Item ${req.params.item_id} was deleted!` })
	} catch (error) {
		throw error
	}
})

module.exports = ApparelRouter
