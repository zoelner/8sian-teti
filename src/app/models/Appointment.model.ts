import { Document, Model, model, Schema, Types } from 'mongoose'
import { IUserModel } from './User.model'

export interface IAppointment {
  provider: string
  date: Date
  user: string
  canceled_at?: Date | null
}

export type IAppointmentSchema = IAppointment & Document

const AppointmentSchema = new Schema<IAppointmentSchema>(
  {
    provider: {
      type: String,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: String,
      ref: 'User',
    },
    canceled_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

export interface IAppointmentModel extends Model<IAppointmentSchema> {
  user: IUserModel
  provider: IUserModel
}

export default model<IAppointmentSchema, IAppointmentModel>(
  'Appointment',
  AppointmentSchema
)
