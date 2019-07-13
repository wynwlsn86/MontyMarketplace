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
	categoryCode: {
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER
	},
	color: {
		type: Sequelize.STRING
	},
	amntSold: {
		type: Sequelize.INTEGER
	},
	currency: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	},
	buyerCost: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	},
	profit: {
		type: Sequelize.DECIMAL(6, 2, 'string')
	}
})

User.beforeCreate(async (user, options) => {
	const hashedPassword = await bcrypt.hash(user.password, 12)
	user.password = hashedPassword
})

User.hasMany(Apparal)

Apparal.belongsTo(User)

module.exports = {
	User,
	Apparal,
	db
}
