import { Router } from 'express'
import { CategoryController } from '../controllers'

const CategoryRouter = Router()
const categoryController = new CategoryController()

CategoryRouter.get('/', categoryController.getCategory.bind(categoryController))
CategoryRouter.post('/', (req, res) =>
  categoryController.createCategory(req, res)
)
CategoryRouter.get(
  '/department/:subCategory_id',
  categoryController.getItemsByCategory.bind(categoryController)
)
CategoryRouter.post(
  '/:category_id/sub-category',
  categoryController.createSubCategory
)
CategoryRouter.put('/:category_id', categoryController.updateCategory)
CategoryRouter.delete(
  '/:category_id',
  categoryController.deleteCategory.bind(categoryController)
)

export default CategoryRouter
