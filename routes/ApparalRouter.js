const express = require('express')
const apparalRouter = express.Router()
const { User, Apparal } = require('../database/models')
const { Sequelize } = require('sequelize')

apparalRouter.get('/', async (req, res) => {
	try {
		const apparal = await Apparal.findAll()
		const data = []
		for (let i = 0; i < apparal.length; i++) {
			const { dataValues } = apparal[i]
			let newData = {
				name: dataValues.name,
				categoryCode: dataValues.categoryCode,
				color: dataValues.color,
				currency: dataValues.currency,
				amntSold: dataValues.amntSold,
				price: dataValues.price,
				buyerCost: dataValues.buyerCost,
				profit: dataValues.profit,
				clearance: dataValues.clearance,
				quantity: dataValues.size.length,
				size: dataValues.size
			}
			data.push(newData)
		}
		res.send(data)
	} catch (error) {
		throw error
	}
})

apparalRouter.get('/:category_code', async (req, res) => {
	try {
		const pants = await Apparal.findAll({
			where: {
				category_code: req.params.category_code.toLowerCase()
			}
		})
		res.send(pants)
	} catch (error) {
		throw error
	}
})

apparalRouter.put('/:item_id/sold', async (req, res) => {
	try {
		const sold = await Apparal.findByPk(req.params.id, { include: [Size] })
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
			imageURl: req.body.imageURl,
			categoryCode: req.body.categoryCode.toLowerCase(),
			price: req.body.price,
			buyerCost: req.body.buyerCost,
			color: req.body.color.toLowerCase(),
			category_code: req.params.category_code,
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
