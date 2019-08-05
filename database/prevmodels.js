const Apparal = db.define('apparal', {
	name: {
		type: Sequelize.STRING
	},
	imageUrl: {
		type: Sequelize.STRING
	},
	categoryCode: {
		type: Sequelize.STRING
	},
	color: {
		type: Sequelize.STRING
	},
	currency: {
		type: Sequelize.STRING,
		defaultValue: 'USD'
	},
	price: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	},
	clearance: {
		type: Sequelize.BOOLEAN
	},
	buyerCost: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	}
})

const Phone = db.define('phone', {
	brand: {
		type: Sequelize.STRING
	},
	imageURL: {
		type: Sequelize.STRING
	},
	modelNumber: {
		type: Sequelize.STRING
	},
	storage: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	carrier: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	deviceType: {
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	color: {
		type: Sequelize.STRING
	},
	physicalCondition: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	currency: {
		type: Sequelize.STRING,
		defaultValue: 'USD'
	},
	price: {
		type: Sequelize.DECIMAL(6, 2, 'string'),
		defaultValue: 0
	},
	clearance: {
		type: Sequelize.BOOLEAN
	}
})

const Sold = db.define('sold', {
	customerName: {
		allowNull: false,
		type: Sequelize.STRING
	},
	productName: {
		allowNull: false,
		type: Sequelize.STRING
	},
	email: {
		allowNull: false,
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	},
	phoneNumber: {
		type: Sequelize.STRING,
		allowNull: false
	},
	item_id: {
		type: Sequelize.INTEGER
	},
	profit: {
		defaultValue: '0',
		type: Sequelize.DECIMAL(16, 2, 'string')
	},
	amntSold: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
})

const Size = db.define('size', {
	apparalSize: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	}
})
