const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')
const dotenv = require('dotenv')

// Routers
const AuthRouter = require('./routes/AuthRouter')
const { userAuthorized } = require('./Auth/Auth')
const ApparelRouter = require('./routes/ApparelRouter')
const phoneRouter = require('./routes/PhoneRouter')
const emailRouter = require('./routes/emailRouter')
const PurchaseRouter = require('./routes/PurchaseRouter')
const InventoryRouter = require('./routes/InventoryRouter')

dotenv.config()
const PORT = process.env.PORT || 3001

const app = express()

// intializing Middleware
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// App Routes
app.use('/auth', AuthRouter)
app.use('/app', userAuthorized)
app.use('/apparel', ApparelRouter)
app.use('/inventory', InventoryRouter)
app.use('/phones', phoneRouter)
app.use('/contact', emailRouter)
app.use('/purchases', PurchaseRouter)
app.use(passport.initialize())

// Test Message
app.get('/', (req, res) => {
	try {
		res.send({ msg: 'Working' })
	} catch (error) {
		throw error
	}
})

// listening Port
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`)
})
