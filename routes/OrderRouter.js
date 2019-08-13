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
			total: `${parseFloat(
				purchasedApparel.price * parseFloat(item_quantity)
			)}`,
			isFulfilled: false
		}

		// console.log(data)
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

module.exports = OrderRouter
