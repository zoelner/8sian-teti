import request from 'supertest'

import app from '../../app'

describe('Appointment', () => {
  it('não é possivel listar sem token', () => {
    request(app).get('/appointment').expect(401)
  })
})
