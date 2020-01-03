import { Router } from 'express'
import { CategoryController } from '../controllers'

const CategoryRouter = Router()
const categoryController = new CategoryController()

CategoryRouter.get('/', categoryController.getCategory)
CategoryRouter.post('/', (req, res) =>
  categoryController.createCategory(req, res)
)
CategoryRouter.get('/department/:subCategory_id', (req, res) =>
  categoryController.getItemsByCategory(req, res)
)
CategoryRouter.post(
  '/:category_id/sub-category',
  categoryController.createSubCategory
)
// CategoryRouter.put('/sub-category/:category_id')
CategoryRouter.put('/:category_id', categoryController.updateCategory)
CategoryRouter.delete('/:category_id', (req, res) =>
  categoryController.deleteCategory(req, res)
)

export default CategoryRouter
