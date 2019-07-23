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

const SoldItem = db.define('soldItem', {
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

User.beforeCreate(async (user, options) => {
	const hashedPassword = await bcrypt.hash(user.password, 12)
	user.password = hashedPassword
})

User.hasMany(SoldItem)
User.hasMany(Apparal)
Apparal.belongsTo(User)
Apparal.hasMany(Size)
Size.belongsTo(Apparal)
SoldItem.belongsTo(User)
User.hasMany(Phone)
Phone.belongsTo(User)

module.exports = {
	User,
	Apparal,
	Phone,
	SoldItem,
	Size,
	db
}
