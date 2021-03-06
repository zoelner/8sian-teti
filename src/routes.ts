import { Router } from 'express'

import UserController from '@controllers/User.controller'
import SessionController from '@controllers/Session.controller'
import ProfileController from '@controllers/Profile.controller'

import authMiddleware from '@middlewares/auth.middleware'
import AppointmentController from '@controllers/Appointment.controller'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.store)
routes.put('/profile', ProfileController.update)
routes.delete('/profile', ProfileController.delete)

routes.get('/appointment', AppointmentController.index)
routes.post('/appointment', AppointmentController.store)

export default routes
