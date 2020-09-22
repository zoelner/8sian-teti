import { Document, Model, model, Schema, Types, NativeDate } from 'mongoose'
import { IUserModel } from './User.model'

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  addressNumber: {
    type: Number,
  },
  complement: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
})

interface IProfileSchema extends Document {
  firstName: string
  lastName: string
  address: string
  addressNumber: number
  complement: string
  birthDate: Date
  user: Types.ObjectId
}

export interface IProfileModel extends Model<IProfileSchema> {
  user: IUserModel
}

export default model<IProfileSchema, IProfileModel>('Profile', ProfileSchema)
