const express = require('express')
const apparalRouter = express.Router()
const { User, Apparal } = require('../database/models')

apparalRouter.get('/', async (req, res) => {
	try {
		const apparal = await Apparal.findAll()
		res.send(apparal)
	} catch (error) {
		throw error
	}
})

apparalRouter.get('/pants', async (req, res) => {
	try {
		const pants = await Apparal.findAll({
			where: {
				category_code: 'pants'
			}
		})
		res.send(pants)
	} catch (error) {
		throw error
	}
})

apparalRouter.put('/:id/category/:category_code/sold', async (req, res) => {
	try {
		const sold = await Apparal.findByPk(req.params.id)
		const { dataValues } = sold
		if (sold) {
			let newQuantity = dataValues.quantity - parseInt(req.body.quantity)
			let amntSold = dataValues.amntSold + parseInt(req.body.quantity)
			let profitCalc = dataValues.price - dataValues.buyerCost

			const data = {
				category_code: req.params.category_code,
				quantity: newQuantity,
				amntSold: amntSold,
				profit: profitCalc * dataValues.amntSold
			}

			await Apparal.update(data, {
				where: {
					id: req.params.id
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
			categoryCode: req.body.categoryCode.toLowerCase(),
			price: req.body.price,
			buyerCost: req.body.buyerCost,
			quantity: req.body.quantity,
			color: req.body.color.toLowerCase()
		}
		const newProduct = await Apparal.create(data)
		await newProduct.setUser(admin)
		res.send(newProduct)
	} catch (error) {
		throw error
	}
})

module.exports = apparalRouter
