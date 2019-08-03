const express = require('express')
const PurchaseRouter = express.Router()
const { Purchase, Apparal, User, Size } = require('../database/models')

module.exports = PurchaseRouter
