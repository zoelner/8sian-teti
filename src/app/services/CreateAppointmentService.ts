import AppError from '@errors/AppError'
import { IAppointmentSchema } from '@models/Appointment.model'
import AppointmentRepository from '@repositories/AppointmentRepository'
import { isBefore, startOfHour } from 'date-fns'

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
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, new Date())) {
      throw new Error('Past dates are not permitted')
    }

    /**
     * Check date availability
     */

    const checkAvailability = await AppointmentRepository.findOne({
      provider,
      canceled_at: null,
      date: appointmentDate,
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
