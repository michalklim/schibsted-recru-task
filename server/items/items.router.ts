import { Router } from 'express'
import * as controllers from './items.controllers'

export const itemsRouter = Router()

// /api/items
itemsRouter.route('/').get(controllers.getMany)
