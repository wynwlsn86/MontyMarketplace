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
	clearance: Sequelize.BOOLEAN,
	colors: Sequelize.ARRAY(Sequelize.STRING)
})

const Product = db.define('product')

const Color = db.define('color', {
	name: Sequelize.STRING
})

const ApparelSize = db.define('apparelSize', {
	size: Sequelize.STRING
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

const ApparelCategory = db.define('apparelCategory', {
	category: Sequelize.STRING
})

User.beforeCreate(async (user, options) => {
	const hashedPassword = await bcrypt.hash(user.password, 12)
	user.password = hashedPassword
})

Apparel.hasMany(ApparelSize)
Apparel.hasMany(ApparelCategory)

ApparelCategory.belongsToMany(Apparel, { through: Product })

// Apparel.belongsTo(Purchase)
Purchase.hasMany(Apparel)
Purchase.hasMany(ApparelSize, { as: 'size_id' })
Purchase.belongsTo(Customer)

Customer.hasMany(Purchase, { as: 'customer_id' })

module.exports = {
	User,
	Customer,
	Purchase,
	Apparel,
	ApparelSize,
	ApparelCategory,
	Product,
	db
}
