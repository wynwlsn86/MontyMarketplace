const express = require('express')
const InventoryRouter = express.Router()
const {} = require('../database/models')

InventoryRouter.get('/', async (req, res) => {})

// query route, format endpoint as such /categories?=query
InventoryRouter.get('/categories', async (req, res) => {})

module.exports = InventoryRouter
