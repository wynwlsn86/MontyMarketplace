const express = require('express')
const apparalRouter = express.Router()
const { Apparal } = require('../database/models')

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

module.exports = apparalRouter
