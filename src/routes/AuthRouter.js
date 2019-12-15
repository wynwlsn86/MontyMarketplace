import { Router } from 'express'
import { AuthController } from '../controllers'

const AuthRouter = Router()

const authController = new AuthController()

AuthRouter.post('/login', authController.loginUser)
AuthRouter.post('/sign-up', authController.registerUser)

export default AuthRouter
