import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { connect, connection } from 'mongoose'
import logger from 'morgan'
import 'dotenv/config'
import { db } from './config'

// Routers
import Router from './routes'

const PORT = process.env.PORT || 3001

const App = express()

// intializing Middleware
App.disable('x-powered-by')
App.use(logger('dev'))
App.use(helmet())
App.use(cors())
App.use(bodyParser.urlencoded({ extended: true }))
App.use(bodyParser.json())

// App Route
App.use('/api', Router)

// mongoose connection to mongo cloud db
// Mongodb Connection
connect(db().connect, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
// Test Message
App.get('/', (req, res) => {
  try {
    res.send({ msg: 'MontyMarket' })
  } catch (error) {
    throw error
  }
})

// listening Port
App.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
