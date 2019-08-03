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

const Apparel = db.define('apparel', {
	name: Sequelize.STRING,
	price: Sequelize.DECIMAL(6, 2, 'string'),
	description: Sequelize.TEXT,
	cost: Sequelize.DECIMAL(6, 2, 'string'),
	imageUrl: Sequelize.STRING,
	clearance: Sequelize.BOOLEAN
})

const Attribute = db.define('attribute', {
	size: {
		type: Sequelize.STRING
	},
	color: {
		type: Sequelize.STRING
	}
})

const Customer = db.define('customer', {
	name: Sequelize.STRING,
	email: Sequelize.STRING
})

const Purchase = db.define('purchase', {
	itemId: Sequelize.INTEGER,
	sizeId: Sequelize.INTEGER,
	customerId: Sequelize.INTEGER
})

const Category = db.define('category', {
	category: {
		type: Sequelize.STRING
	}
})

const Product = db.define('product')

User.beforeCreate(async (user, options) => {
	const hashedPassword = await bcrypt.hash(user.password, 12)
	user.password = hashedPassword
})

Apparel.hasMany(Attribute)
Apparel.hasMany(Category)

Attribute.belongsTo(Apparel)
Category.belongsTo(Apparel)

Purchase.hasMany(Apparel)
Purchase.belongsTo(Customer)

Customer.hasMany(Purchase, { as: 'customer_id' })

module.exports = {
	User,
	Customer,
	Purchase,
	Apparel,
	Attribute,
	Category,
	Product,
	db
}
