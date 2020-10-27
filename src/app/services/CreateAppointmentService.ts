import AppError from '@errors/AppError'
import { IAppointmentSchema } from '@models/Appointment.model'
import UserModel from '@models/User.model'
import AppointmentRepository from '@repositories/AppointmentRepository'
import { format, isBefore, parseISO, startOfHour } from 'date-fns'
import { Request } from 'express'

interface CreateAppointmentRequest {
  user: string
  provider: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    user,
    date,
    provider,
  }: CreateAppointmentRequest): Promise<IAppointmentSchema> {
    const isProvider = await UserModel.findOne({
      id: provider,
      provider: true,
    })
    if (!isProvider) {
      throw new AppError('You can only appointments with provider', 401)
    }

    /**
     * Check if provider is not same user
     */

    if (isProvider.id === user) {
      throw new AppError('Provider cannot mark with itself', 401)
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(date)

    if (isBefore(hourStart, new Date())) {
      throw new AppError('Past dates are not permitted', 401)
    }

    /**
     * Check date availability
     */

    const checkAvailability = await AppointmentRepository.findOne({
      provider,
      canceled_at: null,
      date: hourStart,
    })

    if (checkAvailability) {
      throw new AppError('Appointment is not avaible')
    }

    const appointment = await AppointmentRepository.create({
      user,
      provider,
      date,
    })

    return appointment
  }
}

export default CreateAppointmentService
