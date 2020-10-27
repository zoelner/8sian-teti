import * as Yup from 'yup'
import Profile from '@models/Profile.model'
import AppError from '@errors/AppError'

const schema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  address: Yup.string(),
  addressNumber: Yup.number(),
  complement: Yup.string(),
  birthDate: Yup.date(),
})

interface Fields {
  firstName: string
  lastName: string
  address: string
  addressNumber: string
  complement: string
  birthDate: string
}

interface Request {
  user: string
  data: Fields
}

class UpdateProfileService {
  public async execute({ user, data }: Request) {
    if (!schema.isValidSync(data)) {
      throw new AppError('Validation fails')
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      throw new AppError('Profile not found')
    }

    await profile.updateOne(data)

    return profile
  }
}

export default UpdateProfileService
