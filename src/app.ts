import 'dotenv/config'
import express from 'express'
import 'express-async-errors'

import cors from 'cors'
import routes from './routes'

import './database'

import ExceptionHandling from '@middlewares/exceptionHandling.middleware'
class App {
  public server = express()

  constructor() {
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use(ExceptionHandling)
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
