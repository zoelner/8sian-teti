import { Request, Response } from 'express'

import AppointmentRepository from '@repositories/AppointmentRepository'
import CreateAppointmentService from '@services/CreateAppointmentService'

class AppointmentController {
  async index(req: Request, res: Response) {
    const user = req.user.id

    const findAppointment = AppointmentRepository.find()

    return res.json(findAppointment)
  }

  async store(req: Request, res: Response) {
    const user = req.user.id
    const { provider, date } = req.body
    const createappointment = new CreateAppointmentService()
    const appointment = await createappointment.execute({
      user,
      provider,
      date,
    })

    return res.json(appointment)
  }

  async update(req: Request, res: Response) {}
}

export default new AppointmentController()
