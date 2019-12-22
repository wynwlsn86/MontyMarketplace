import { Router } from 'express'
import { CategoryController } from '../controllers'

const CategoryRouter = Router()
const categoryController = new CategoryController()

CategoryRouter.get('/', categoryController.getCategory)
CategoryRouter.post('/', categoryController.createCategory)
// Format this route like so /department/?category=objectId or /department/?sub_category=ObjectId
CategoryRouter.get('/department', categoryController.getItemsByPrimaryCategory)
CategoryRouter.post(
  '/:category_id/sub-category',
  categoryController.createSubCategory
)
// CategoryRouter.put('/sub-category/:category_id')
CategoryRouter.put('/:category_id', categoryController.updateCategory)

export default CategoryRouter
