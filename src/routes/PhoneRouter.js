import { Router } from 'express'
import { PhoneController } from '../controllers'
import { authenticate } from '../auth'

// Initialize Router
const PhoneRouter = Router()

// Create New Instance of phoneController Class
const phoneContoller = new PhoneController()

PhoneRouter.get('/', phoneContoller.getPhones)
PhoneRouter.get('/:phone_id', phoneContoller.getPhoneById)
PhoneRouter.post('/', authenticate, phoneContoller.addPhone)
PhoneRouter.post('/images', authenticate, phoneContoller.addPhoneImage)
PhoneRouter.put('/:phone_id', authenticate, phoneContoller.updatePhone)
PhoneRouter.delete('/:phone_id', authenticate, phoneContoller.deletePhone)

export default PhoneRouter
