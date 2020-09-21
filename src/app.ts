import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes'

import './database'

class App {
  public server = express()

  constructor() {
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
