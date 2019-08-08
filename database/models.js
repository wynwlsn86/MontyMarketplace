const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseMoney = require('mongoose-money')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				required: true
			},
			last: {
				type: String,
				required: true
			}
		},
		password: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

const apparelSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		imageUrl: {
			type: [{ type: String }]
		},
		description: {
			type: String
		},
		attributes: {
			colors: [{ type: String }],
			sizes: [{ type: String }]
		},
		price: {
			type: Number
		},
		cost: {
			type: Number
		}
	},
	{
		timestamps: true
	}
)

const customerSchema = new Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String
		},
		phoneNumber: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

const orderSchema = new Schema(
	{
		product_id: {
			type: String
		},
		customer_id: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

const phoneSchema = new Schema(
	{
		brand: {
			type: String
		},
		model: {
			type: String
		},
		storage: {
			type: [{type:String}]
		},
		imageUrl: {
			type: [{ type: String }]
		},
		condition: {
			type: [{ type: String }]
		},
		price: {
			type: Number
		},
		cost: {
			type: Number
		},
		carrier: {
			type: [{type:String}]
		}
	},
	{
		timestamps: true
	}
)

const User = mongoose.model('Users', userSchema)
const Apparel = mongoose.model('Apparel', apparelSchema)
const Phone = mongoose.model('Phones', phoneSchema)
const Customer = mongoose.model('Customers', customerSchema)
const Order = mongoose.model('Orders', orderSchema)

module.exports = {
	User,
	Apparel,
	Phone,
	Customer,
	Order
}
