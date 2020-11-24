import CreateAppointmentService from '@services/CreateAppointmentService'
import { addHours, startOfHour } from 'date-fns'
import Appointment from '@models/Appointment.model'

import mockingoose from 'mockingoose'

const getDoc = (hour?: Date) => ({
  _id: '507f191e810c19729de860',
  date: hour,
  user: '507f191e810c19729de860',
  provider: '507f191e810c19729de820',
})

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const hour = startOfHour(addHours(new Date(), 1))

    mockingoose(Appointment)
      .toReturn(getDoc(hour), 'save')
      .toReturn(null, 'findOne')

    const service = new CreateAppointmentService()

    const appointment = await service.execute({
      ...getDoc(),
      date: addHours(new Date(), 1),
    })

    expect(appointment.date).toBe(hour)
  })

  it('should not be able to create on past time', async () => {
    const service = new CreateAppointmentService()

    const appointment = service.execute({
      ...getDoc(),
      date: new Date(),
    })

    appointment
      .then()
      .catch(error =>
        expect(error.message).toBe('Past dates are not permitted')
      )
  })

  it('should not be able to create not availability', async () => {
    const hour = startOfHour(addHours(new Date(), 1))

    mockingoose(Appointment).toReturn(getDoc(hour), 'findOne')
    const service = new CreateAppointmentService()

    const appointment = service.execute({
      ...getDoc(),
      date: addHours(new Date(), 1),
    })

    appointment
      .then()
      .catch(error => expect(error.message).toBe('Appointment is not avaible'))
  })
})
