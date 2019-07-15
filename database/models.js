const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const db = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost:5432/montymarketplace ',
	{
		database: 'montymarketplace ',
		dialect: 'postgres',
		define: {
			underscored: true
		}
	}
)
const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

const Apparal = db.define('apparal', {
	name: {
		type: Sequelize.STRING
	},
	imageURL: {
		type: Sequelize.STRING
	},
	categoryCode: {
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER,
		default: 0
	},
	size: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	color: {
		type: Sequelize.STRING
	},
	amntSold: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	currency: {
		type: Sequelize.STRING,
		defaultValue: 'USD'
	},
	price: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	},
	buyerCost: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	},
	profit: {
		defaultValue: '0',
		type: Sequelize.DECIMAL(16, 2, 'string')
	},
	clearance: {
		type: Sequelize.BOOLEAN
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
	amntSold: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	currency: {
		type: Sequelize.STRING,
		defaultValue: 'USD'
	},
	price: {
		type: Sequelize.DECIMAL(6, 2, 'string'),
		defaultValue: 0
	},
	buyerCost: {
		type: Sequelize.DECIMAL(6, 2, 'string'),
		defaultValue: '0'
	},
	profit: {
		defaultValue: '0',
		type: Sequelize.DECIMAL(16, 2, 'string')
	},
	clearance: {
		type: Sequelize.BOOLEAN
	}
})

const Sold = db.define('sold', {
	name: {
		allowNull: false,
		type: Sequelize.STRING
	},
	product: {
		allowNull: false,
		type: Sequelize.ARRAY(Sequelize.STRING)
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
	}
})

// const Size = db.define('size', {
// 	apparalSize: {
// 		type: Sequelize.ARRAY(Sequelize.STRING)
// 	}
// })

User.beforeCreate(async (user, options) => {
	const hashedPassword = await bcrypt.hash(user.password, 12)
	user.password = hashedPassword
})

User.hasMany(Sold)

User.hasMany(Apparal)
Apparal.belongsTo(User)
// Apparal.hasMany(Size)
// Size.belongsTo(Apparal)
Sold.belongsTo(User)
User.hasMany(Phone)
Phone.belongsTo(User)

module.exports = {
	User,
	Apparal,
	Phone,
	// Size,
	db
}
