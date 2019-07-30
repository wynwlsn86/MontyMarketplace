const { User, Apparal, Phone, Sold } = require('./models')
const { PhoneData } = require('./PhoneData')

const main = async () => {
	await User.destroy({ where: {} })
	await Phone.destroy({ where: {} })
	await Apparal.destroy({ where: {} })
	await Sold.destroy({ where: {} })
	// Seed Data

	const soldItem = await Sold.create({
		customerName: 'Joe',
		productName: 'T-shirt',
		email: 'mail@mail.com',
		phoneNumber: '123-123-1234'
	})

	const user = await User.create({
		name: 'John Smith',
		username: 'tester',
		email: 'tester@mail.com',
		password: '1234'
	})

	const tShirt = await Apparal.create({
		name: 'Awesome T-shirt',
		categoryCode: 'shirts',
		color: 'red',
		currency: 'USD',
		amntSold: 0,
		price: 60.59,
		buyerCost: 20.59,
		profit: 0,
		clearance: true
	})

	const jean = await Apparal.create({
		name: 'Very Blue Jeans',
		categoryCode: 'pants',
		color: 'blue',
		currency: 'USD',
		amntSold: 31,
		price: 100.2,
		buyerCost: 40.0,
		profit: 1866.51,
		clearance: false
	})

	const jacket = await Apparal.create({
		name: 'Dope Bomber Jacket',
		categoryCode: 'jackets',
		price: '300.84',
		buyerCost: '120.00',
		color: 'black',
		clearance: false
	})

	const seedPhoneData = async () => {
		for (let i = 0; i < PhoneData.length; i++) {
			const phones = await Phone.create({
				imageURL: PhoneData[i].imageURL,
				brand: PhoneData[i].brand,
				modelNumber: PhoneData[i].modelNumber,
				storage: PhoneData[i].storage,
				physicalCondition: PhoneData[i].physicalCondition,
				deviceType: PhoneData[i].deviceType,
				carrier: PhoneData[i].carrier,
				userId: 1
			})
			await phones.setUser(user)
		}
	}

	await seedPhoneData()
	await tShirt.setUser(user)
	await jean.setUser(user)
	await jacket.setUser(user)
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
