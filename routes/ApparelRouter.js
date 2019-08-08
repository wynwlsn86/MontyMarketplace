const express = require('express')
const ApparelRouter = express.Router()
const { Apparel, Category } = require('../database/models')

ApparelRouter.get('/', async (req, res) => {
	try {
		const apparel = await Apparel.find()
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
		const apparel = await Apparel.create(req.body)
		await apparel.save()
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.put('/:item_id', async (req, res) => {
	try {
		const apparel = await Apparel.findByIdAndUpdate(
			req.params.item_id,
			req.body,
			{
				useFindAndModify: false,
				new: true
			}
		)
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
