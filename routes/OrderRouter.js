const express = require('express')
const OrderRouter = express.Router()
const { Apparel, Customer, Order, ItemDetail } = require('../database/models')
const usdFormatter = require('../tools/CurrencyFormatter')

OrderRouter.get('/', async (req, res) => {
	try {
		const orders = await Order.find()
		res.send(orders)
	} catch (error) {
		throw error
	}
})

OrderRouter.get('/customers', async (req, res) => {
	try {
		const customers = await Customer.find()
		res.send(customers)
	} catch (error) {
		throw error
	}
})

OrderRouter.post('/', async (req, res) => {
	try {
		let newCustomer
		const existingCustomer = await Customer.findOne().where({
			email: req.body.customer.email,
			name: {
				first: req.body.customer.name.first,
				last: req.body.customer.name.last
			}
		})
		const {
			details: { apparel, item_quantity, size, color }
		} = req.body

		if (!existingCustomer) {
			newCustomer = await Customer.create(req.body.customer)
			await newCustomer.save()
		}

		const purchasedApparel = await Apparel.findById(apparel)
		let data = {
			apparel: purchasedApparel._id,
			item_quantity: item_quantity,
			customer_id: existingCustomer ? existingCustomer._id : newCustomer._id,
			size: size,
			color: color,
			total: usdFormatter.format(purchasedApparel.price * item_quantity),
			isFulfilled: false
		}
		const updateQuantity = {
			quantity: purchasedApparel.quantity - data.item_quantity
		}
		const updateApparel = await Apparel.findByIdAndUpdate(
			purchasedApparel._id,
			updateQuantity,
			{
				useFindAndModify: false,
				new: true
			}
		)
		await updateApparel.save()
		const order = await Order.create(data)
		await order.save()
		const itemDetails = await ItemDetail.findOne().where({
			apparel: purchasedApparel._id,
			color: color,
			size: size
		})
		const updatedDetails = {
			colorQuantity: itemDetails.colorQuantity - data.item_quantity,
			sizeQuantity: itemDetails.sizeQuantity - data.item_quantity
		}
		const newDetails = await ItemDetail.findByIdAndUpdate(
			itemDetails._id,
			updatedDetails,
			{
				useFindAndModify: false,
				new: true
			}
		)
		await newDetails.save()
		res.send(order)
	} catch (error) {
		throw error
	}
})

OrderRouter.put('/:order_id', async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.order_id,
			req.body.order,
			{
				useFindAndModify: false,
				new: true
			}
		)
		await order.save()
		res.send(order)
	} catch (error) {
		throw error
	}
})

OrderRouter.delete('/:order_id', async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.order_id)
		res.send(`Order ${req.params.order_id} was deleted`)
	} catch (error) {
		throw error
	}
})

module.exports = OrderRouter
