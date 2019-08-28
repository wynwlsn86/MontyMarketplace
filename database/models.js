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

const categorySchema = new Schema(
	{
		group: {
			type: String
		},
		attire: {
			type: [{ type: String }]
		},
		gender: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

const itemDetailSchema = new Schema(
	{
		color: {
			type: String
		},
		colorQuantity: {
			type: Number
		},
		size: {
			type: String
		},
		sizeQuantity: {
			type: Number
		},
		apparel: { type: Schema.Types.ObjectId, ref: 'Apparel' }
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
		brand: {
			type: String
		},
		category: {
			group: {
				type: String
			},
			attire: {
				type: String
			}
		},
		imageUrl: {
			type: [{ type: String }]
		},
		description: {
			type: String
		},
		clearance: {
			type: Boolean
		},
		price: {
			type: String
		},
		cost: {
			type: String
		},
		quantity: {
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
			first: {
				type: String
			},
			last: {
				type: String
			}
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
		apparal: {
			type: String
		},
		item_quantity: {
			type: Number
		},
		size: {
			type: String
		},
		color: {
			type: String
		},
		customer_id: {
			type: String
		},
		total: {
			type: String
		},
		isFulfilled: {
			type: Boolean
		}
	},
	{
		timestamps: true
	}
)

const phoneImageSchema = new Schema(
	{
		imageUrl: {
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
		model_number: {
			type: String
		},
		storage: {
			type: String
		},
		condition: {
			type: String
		},
		price: {
			type: String
		},
		cost: {
			type: String
		},
		imei: {
			type: String
		},
		imageUrl: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PhoneImage'
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
const Category = mongoose.model('Category', categorySchema)
const ItemDetail = mongoose.model('ItemDetail', itemDetailSchema)
const PhoneImage = mongoose.model('PhoneImage', phoneImageSchema)

module.exports = {
	User,
	Apparel,
	Phone,
	Customer,
	Category,
	ItemDetail,
	PhoneImage,
	Order
}
