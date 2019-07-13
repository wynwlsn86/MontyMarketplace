const { User, Apparal } = require('./models')

const main = async () => {
	await User.destroy({ where: {} })

	// Seed Data

	const user = await User.create({
		name: 'John Smith',
		username: 'tester',
		email: 'tester@mail.com',
		password: '1234'
	})

	const tShirt = await Apparal.create({
		name: 'Awesome T-shirt',
		categoryCode: 'shirt',
		color: 'red',
		currency: 'USD',
		quantity: 100,
		amntSold: 0,
		price: 60.59,
		buyerCost: 20.59
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

	const jacket = await Apparal.create

	await tShirt.setUser(user)
	await jean.setUser(user)
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
