const express = require('express')
const apparalRouter = express.Router()
const { User, Apparal, Size } = require('../database/models')

apparalRouter.get('/', async (req, res) => {
	try {
		const apparal = await Apparal.findAll({
			include: [Size]
		})
		res.send(apparal)
	} catch (error) {
		throw error
	}
})

apparalRouter.get('/clearance=:clearance_items', async (req, res) => {
	try {
		const apparal = await Apparal.findAll({
			where: { clearance: req.params.clearance_items },
			include: [Size]
		})
		res.send(apparal)
	} catch (error) {
		throw error
	}
})

apparalRouter.get('/:category_code', async (req, res) => {
	try {
		const category = await Apparal.findAll({
			where: {
				category_code: req.params.category_code.toLowerCase()
			}
		})
		res.send(category)
	} catch (error) {
		throw error
	}
})

apparalRouter.put('/:item_id/sold', async (req, res) => {
	try {
		const sold = await Apparal.findByPk(req.params.item_id)
		const { dataValues } = sold
		if (sold) {
			let newQuantity = dataValues.quantity - parseInt(req.body.quantity)
			let amntSold = dataValues.amntSold + parseInt(req.body.quantity)
			let profitCalc = dataValues.price - dataValues.buyerCost

			const data = {
				name: req.body.name,
				imageURl: req.body.imageURl,
				categoryCode: req.body.categoryCode.toLowerCase(),
				price: req.body.price,
				buyerCost: req.body.buyerCost,
				color: req.body.color.toLowerCase(),
				quantity: newQuantity,
				amntSold: amntSold,
				profit: profitCalc * dataValues.amntSold
			}

			await Apparal.update(data, {
				where: {
					id: req.params.item_id
				}
			})

			res.send(sold)
		}
	} catch (error) {
		throw error
	}
})

apparalRouter.post('/user/:id/inventory/add', async (req, res) => {
	try {
		const admin = await User.findByPk(req.params.id)

		const data = {
			name: req.body.name,
			imageURl: req.body.imageURl,
			categoryCode: req.body.categoryCode.toLowerCase(),
			price: req.body.price,
			buyerCost: req.body.buyerCost,
			color: req.body.color.toLowerCase(),
			quantity: req.body.quantity
		}
		const newProduct = await Apparal.create(data)
		await newProduct.setUser(admin)
		res.send(newProduct)
	} catch (error) {
		throw error
	}
})

apparalRouter.delete('/:item_id', async (req, res) => {
	try {
		const removeItem = await Apparal.findByPk(req.params.device_id)
		if (removeItem) {
			await Apparal.destroy({ where: { id: req.params.item_id } })
			res.send(`Item ${req.params.device_id} was removed!`)
		}
	} catch (error) {
		throw error
	}
})

module.exports = apparalRouter
