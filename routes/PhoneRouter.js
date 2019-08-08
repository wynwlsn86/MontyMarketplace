const express = require('express')
const PhoneRouter = express.Router()
const { Phone } = require('../database/models')

PhoneRouter.get('/', async (req, res) => {
	try {
		const phones = await Phone.find()
		res.send(phones)
	} catch (error) {
		throw error
	}
})

PhoneRouter.get('/:item_id', async (req, res) => {
	try {
		const phones = await Phone.findById()
		res.send(phones)
	} catch (error) {
		throw error
	}
})

PhoneRouter.post('/', async (req, res) => {
	try {
		const phone = await Phone.create()
		await phone.save()
		res.send(phones)
	} catch (error) {
		throw error
	}
})

PhoneRouter.put('/', async (req, res) => {
	try {
		const phone = await Phone.findByIdAndUpdate(req.params.item_id, req.body, {
			useFindAndModify: false,
			new: true
		})
		res.send(phone)
	} catch (error) {
		throw error
	}
})

PhoneRouter.delete('/', async (req, res) => {
	try {
		await Phone.findOneAndDelete(req.params.item_id)
		res.send({ msg: `Item ${req.params.item_id} was deleted!` })
	} catch (error) {
		throw error
	}
})

module.exports = PhoneRouter
