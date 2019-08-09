const express = require('express')
const PurchaseRouter = express.Router()
const {} = require('../database/models')

const usdFormatter = new Intl.NumberFormat('en-us', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})

module.exports = PurchaseRouter
