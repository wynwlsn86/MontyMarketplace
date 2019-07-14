const express = require('express')
const phoneRouter = express.Router()
const { Phone, User } = require('../database/models')
const { PhoneData } = require('../database/PhoneData')
phoneRouter.get('/', async (req, res) => {
	try {
		const phone = await Phone.findAll()
		res.send(phone)
	} catch (error) {
		throw error
	}
})

phoneRouter.get('/:device_id', async (req, res) => {
	try {
		const device = await Phone.findByPk(req.params.device_id)
		res.send(device)
	} catch (error) {}
})

phoneRouter.put('/:phone_id/inventory/update/', async (req, res) => {
	try {
		const phone = await Phone.findByPk(req.params.phone_id)
		const { dataValues } = phone
		if (phone) {
			let newQuantity = dataValues.quantity + parseInt(req.body.quantity)
			let amntSold = dataValues.amntSold + parseInt(req.body.quantity)
			let profitCalc = dataValues.price - dataValues.buyerCost

			const data = {
				imageURL: req.params.imageURL,
				imageURL: req.body.imageURL,
				brand: req.body.maker,
				modelNumber: req.body.modelNumber,
				storage: req.body.storage,
				physicalCondition: req.body.physicalCondition,
				deviceType: req.body.deviceType,
				carrier: req.body.carrier,
				price: req.body.price,
				color: req.body.color,
				quantity: newQuantity,
				amntSold: amntSold,
				profit: profitCalc * dataValues.amntSold
			}

			const updatedPhone = await Phone.update(data, {
				where: {
					id: req.params.phone_id
				}
			})
			res.send(updatedPhone)
		}
	} catch (error) {
		throw error
	}
})

phoneRouter.post('/user/:user_id/inventory/new', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.user_id)
		if (user) {
			const newDevice = await Phone.create(req.body)
			res.send(newDevice)
		}
	} catch (error) {}
})

phoneRouter.delete('/device/:device_id', async (req, res) => {
	try {
		const removeDevice = await Phone.findByPk(req.params.device_id)
		if (removeDevice) {
			await Phone.destroy({ where: { id: req.params.device_id } })
		}
		res.send(`Device ${req.params.device_id} was removed!`)
	} catch (error) {
		throw error
	}
})

module.exports = phoneRouter
