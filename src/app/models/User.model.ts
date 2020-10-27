import { Document, Model, model, Schema, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import { IProfileModel } from './Profile.model'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Types.ObjectId,
      ref: 'Profile',
    },
    provider: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

interface IUserSchema extends Document {
  email: string
  password: string
  profile?: Types.ObjectId
  checkPassword(id: string): Promise<boolean>
}

export interface IUserModel extends Model<IUserSchema> {
  profile: IProfileModel
}

UserSchema.pre<IUserSchema>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

UserSchema.pre<IUserSchema>('update', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

UserSchema.methods.checkPassword = function (data: IUserSchema) {
  return bcrypt.compareSync(data, this.password)
}

UserSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret['password']
    return ret
  },
})

export default model<IUserSchema, IUserModel>('User', UserSchema)
