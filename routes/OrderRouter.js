const express = require('express')
const OrderRouter = express.Router()
const { Apparel, Customer, Order, ItemDetail } = require('../database/models')

OrderRouter.get('/', async (req, res) => {
	try {
		const orders = await Order.find()
		res.send(orders)
	} catch (error) {
		throw error
	}
})

OrderRouter.post('/', async (req, res) => {
	try {
		const itemDetails = await ItemDetail.findByIdAndUpdate()
		const newCustomer = await Customer.create()
		const order = await Order.create()
	} catch (error) {
		throw error
	}
})

module.exports = OrderRouter
