import { Router } from 'express'
import { CategoryController } from '../controllers'

const CategoryRouter = Router()
const categoryController = new CategoryController()

CategoryRouter.get('/', categoryController.getCategory)
// Take params, structure api call as /?someData=data
CategoryRouter.get('/', categoryController.filterByCategory)
CategoryRouter.post('/', categoryController.createCategory)
CategoryRouter.put('/:category_id', categoryController.updateCategory)

export default CategoryRouter
