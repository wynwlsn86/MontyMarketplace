import { Router as ExpressRouter } from 'express'
import ApparelRouter from './ApparelRouter'
import PhoneRouter from './PhoneRouter'
import AuthRouter from './AuthRouter'
import CategoryRouter from './CategoryRouter'

const Router = ExpressRouter()

Router.use('/apparel', ApparelRouter)
Router.use('/auth', AuthRouter)
Router.use('/categories', CategoryRouter)
Router.use('/phones', PhoneRouter)

export default Router
