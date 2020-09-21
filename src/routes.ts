import { Router } from 'express'

import UserController from '@controllers/User.controller'
import SessionController from '@controllers/Session.controller'

import authMiddleware from '@middlewares/auth.middeware'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

// routes.put('/users', UserController.update)

export default routes
