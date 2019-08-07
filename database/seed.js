const {
	User,
	Apparel,
	Attribute,
	Purchase,
	Category,
	Phone
} = require('./models')
const { PhoneData } = require('./PhoneData')
const sneakerData = require('./productSeed.json')

const main = async () => {
	await User.destroy({ where: {} })
	await Apparel.destroy({ where: {} })
	await Purchase.destroy({ where: {} })

	const tshirt = await Apparel.create({
		name: 'Awesome T-shirt',
		price: '60.59',
		cost: '20.59',
		clearance: true
	})

	const jeans = await Apparel.create({
		name: 'Very Blue Jeans',
		price: '100.2',
		cost: '40.0',
		clearance: false
	})

	const pants = await Category.create({
		category: 'pants'
	})

	const shirts = await Category.create({
		category: 'shirts'
	})

	const tops = await Category.create({
		category: 'tops'
	})

	const jacket = await Apparel.create({
		name: 'Dope Bomber Jacket',
		price: '300.84',
		cost: '120.00',
		clearance: false
	})

	const data = await Attribute.create({
		color: 'red',
		size: 'lg'
	})
	await data.setApparel(tshirt)
	await jeans.addCategory(pants)
	await jacket.addCategory(tops)
	await tshirt.addCategory(shirts)

	const sneaker = await Category.create({
		category: 'Sneakers'
	})
	const purchase = await Purchase.create({
		itemId: 1
	})
	const purchase1 = await Purchase.create({
		itemId: 2
	})
	const purchase2 = await Purchase.create({
		itemId: 1
	})
	const purchase3 = await Purchase.create({
		itemId: 2
	})
	const purchase4 = await Purchase.create({
		itemId: 2
	})
	const purchase5 = await Purchase.create({
		itemId: 3
	})

	const seedPhoneData = async () => {
		for (let i = 0; i < PhoneData.length; i++) {
			await Phone.create({
				imageURL: PhoneData[i].imageURL,
				brand: PhoneData[i].brand,
				modelNumber: PhoneData[i].modelNumber,
				storage: PhoneData[i].storage,
				physicalCondition: PhoneData[i].physicalCondition,
				deviceType: PhoneData[i].deviceType,
				carrier: PhoneData[i].carrier,
				userId: 1
			})
		}
	}

	const seedSneakers = async () => {
		for (let i = 0; i < sneakerData.length; i++) {
			const dollarAmnt = Math.random() * (300 - 30) + 30
			const percentage = dollarAmnt / 100
			const cost = (dollarAmnt / 100) * 1000
			const sneakers = await Apparel.create({
				name: sneakerData[i].name,
				description: sneakerData[i].description,
				imageUrl: sneakerData[i].imageUrl,
				cost: (percentage * cost) / 100,
				brand: sneakerData[i].brand,
				price: dollarAmnt.toPrecision(5)
			})
			await sneaker.setApparel(sneakers)
		}
	}
	await seedSneakers()
	await seedPhoneData()
}
async function run() {
	try {
		await main()
	} catch (e) {
		throw error
	} finally {
		await process.exit()
	}
}

run()
