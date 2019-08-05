const { User, Apparel, Attribute, Purchase, Category } = require('./models')

const { PhoneData } = require('./PhoneData')

const main = async () => {
	await User.destroy({ where: {} })
	await Apparel.destroy({ where: {} })
	await Purchase.destroy({ where: {} })
	// Seed Data

	// const soldItem = await Sold.create({
	// 	customerName: 'Joe',
	// 	productName: 'T-shirt',
	// 	email: 'mail@mail.com',
	// 	phoneNumber: '123-123-1234'
	// })

	// const user = await User.create({
	// 	name: 'John Smith',
	// 	username: 'tester',
	// 	email: 'tester@mail.com',
	// 	password: '1234'
	// })

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
	// await tshirt.setCategory(shirts)
	// const seedPhoneData = async () => {
	// 	for (let i = 0; i < PhoneData.length; i++) {
	// 		const phones = await Phone.create({
	// 			imageURL: PhoneData[i].imageURL,
	// 			brand: PhoneData[i].brand,
	// 			modelNumber: PhoneData[i].modelNumber,
	// 			storage: PhoneData[i].storage,
	// 			physicalCondition: PhoneData[i].physicalCondition,
	// 			deviceType: PhoneData[i].deviceType,
	// 			carrier: PhoneData[i].carrier,
	// 			userId: 1
	// 		})
	// 		await phones.setUser(user)
	// 	}
	// }

	// await seedPhoneData()
	// await tShirt.setUser(user)
	// await jean.setUser(user)
	// await jacket.setUser(user)
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
