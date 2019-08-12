const express = require('express')
const ApparelRouter = express.Router()
const { Apparel, Category, ItemDetail } = require('../database/models')

ApparelRouter.get('/', async (req, res) => {
	try {
		const apparel = await Apparel.find()
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.get('/brands/:brand', async (req, res) => {
	try {
		const apparel = await Apparel.find().where({
			brand: req.params.brand
		})
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.get('/:item_id', async (req, res) => {
	try {
		const apparel = await Apparel.findById(req.params.item_id)
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.post('/:category_id', async (req, res) => {
	try {
		const category = await Category.findById(req.params.category_id)
		const { brand, imageUrl, name, description, attributes, price } = req.body

		const data = {
			category_id: category.id,
			brand,
			imageUrl,
			name,
			description,
			price
		}
		const apparel = await Apparel.create(data)
		const newItem = {
			apparel: apparel._id,
			color: attributes.color,
			size: attributes.size
		}

<<<<<<< Updated upstream
		const item = await ItemDetail.create(newItem)
=======
		await itemData.forEach(async (data) => {
			const newItemDetail = {
				apparel: apparel._id,
				colorQuantity: data.colorQuantity,
				color: data.color,
				size: data.size,
				sizeQuantity: data.sizeQuantity
			}
			const itemDetail = await ItemDetail.create(newItemDetail)
			await itemDetail.save(itemDetail)
		})
>>>>>>> Stashed changes
		await apparel.save()
		await item.save()
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.put('/:item_id', async (req, res) => {
	try {
		const apparel = await Apparel.findByIdAndUpdate(
			req.params.item_id,
			req.body.item,
			{
				useFindAndModify: false,
				new: true
			}
		)
		await apparel.save()
		res.send(apparel)
	} catch (error) {
		throw error
	}
})

ApparelRouter.delete('/:item_id', async (req, res) => {
	try {
		await Apparel.findOneAndDelete(req.params.item_id)
		res.send({ msg: `Item ${req.params.item_id} was deleted!` })
	} catch (error) {
		throw error
	}
})

module.exports = ApparelRouter
