const { User, Apparal, Phone, Size } = require('./models')
const { PhoneData } = require('./PhoneData')

const main = async () => {
	await User.destroy({ where: {} })
	await Phone.destroy({ where: {} })
	await Apparal.destroy({ where: {} })
	// Seed Data

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
		quantity: 100,
		amntSold: 0,
		price: 60.59,
		buyerCost: 20.59,
		profit: 0
	})

	const jean = await Apparal.create({
		name: 'Very Blue Jeans',
		categoryCode: 'pants',
		color: 'blue',
		currency: 'USD',
		quantity: 56,
		amntSold: 31,
		price: 100.2,
		buyerCost: 40.0,
		profit: 1866.51
	})

	const size = await Size.create({
		apparalSize: 'medium'
	})

	const jacket = await Apparal.create({
		name: 'Dope Bomber Jacket',
		categoryCode: 'Jackets',
		price: '300.84',
		buyerCost: '120.00',
		quantity: 300,
		color: 'black'
	})

	seedPhoneData = async () => {
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

	await size.setApparal(jacket)
	await seedPhoneData()
	await tShirt.setUser(user)
	await jean.setUser(user)
	await jacket.setUser(user)
}
async function run() {
	try {
		await main()
	} catch (e) {
		console.error(e)
	} finally {
		await process.exit()
	}
}

run()
