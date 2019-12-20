import { Router } from 'express'
import { ApparelController } from '../controllers'
import { authenticate } from '../auth'

const ApparelRouter = Router()
const apparelController = new ApparelController()

ApparelRouter.get('/', apparelController.getApparel)
ApparelRouter.get('/:apparel_id', apparelController.getItemById)
ApparelRouter.get('/brands/:brand', apparelController.getApparelByBrand)
ApparelRouter.post('/', authenticate, (req, res) =>
  apparelController.addItem(req, res)
)
ApparelRouter.put('/apparel_id', authenticate, apparelController.updateItem)
ApparelRouter.delete('/:apparel_id', authenticate, apparelController.removeItem)

export default ApparelRouter
