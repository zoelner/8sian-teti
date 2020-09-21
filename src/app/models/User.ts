import { Document, Model, model, Schema, VirtualType } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

interface IUserSchema extends Document {
  name: string
  email: string
  password: string
  checkPassword(data: IUserSchema): boolean
}

export interface IUserModel extends Model<IUserSchema> {}

UserSchema.pre<IUserSchema>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

UserSchema.methods.checkPassword = async function (data: IUserSchema) {
  return bcrypt.compare(data, this.password)
}

UserSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password']
    return ret
  },
})

export default model<IUserSchema, IUserModel>('User', UserSchema)
