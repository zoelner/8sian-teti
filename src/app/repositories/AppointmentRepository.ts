import Appointment, { IAppointment } from '@models/Appointment.model'

class AppointmentRepository {
  constructor(private repository: typeof Appointment) {}

  public async findByDate(date: Date) {
    const findAppointment = await this.repository.findOne({
      date,
    })

    return findAppointment
  }

  public async create(data: IAppointment) {
    return this.repository.create(data)
  }

  public async find(data?: Partial<IAppointment>) {
    return this.repository.find(data ?? {})
  }

  public async findOne(data: Partial<IAppointment>) {
    return this.repository.findOne(data)
  }
}

export { AppointmentRepository }

export default new AppointmentRepository(Appointment)
