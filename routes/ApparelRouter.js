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

		const itemData = attributes.map((attribute) => {
			const attributeData = { color: attribute.color, size: attribute.size }
			return attributeData
		})

		let sum = 0
		await attributes.forEach(
			(quantity) => (sum += quantity.sizeQuantity + quantity.colorQuantity)
		)
		const data = {
			category_id: category.id,
			brand,
			imageUrl,
			name,
			description,
			price,
			quantity: sum
		}

		// Im gonna have to add a conditional to this to handle not creating duplicates
		// mongoose doesnt have findorcreate so I may have to do a query to findOne first and perform an update
		// and if not found then create it

		const apparel = await Apparel.create(data)

		await itemData.forEach(async (data) => {
			const newItemDetail = {
				apparel: apparel._id,
				color: data.color,
				size: data.size
			}
			const itemDetail = await ItemDetail.create(newItemDetail)
			await itemDetail.save(itemDetail)
		})
		await apparel.save()

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
