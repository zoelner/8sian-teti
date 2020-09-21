import { MONGO_URL } from './config/database'
import mongoose from 'mongoose'

class Database {
  public connection?: Promise<typeof mongoose>

  constructor() {
    this.init()
  }

  init() {
    this.connection = mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })

    mongoose.connection.on('disconnected', this.init)
  }
}

export default new Database()
