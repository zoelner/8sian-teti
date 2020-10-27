import * as Yup from 'yup'
import Profile from '@models/Profile.model'
import AppError from '@errors/AppError'

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  addressNumber: Yup.number().required(),
  complement: Yup.string().required(),
  birthDate: Yup.date().required(),
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

class CreateProfileService {
  public async execute({ user, data }: Request) {
    if (!schema.isValidSync(data)) {
      throw new AppError('Validation fails')
    }

    const profileExists = await Profile.exists({ user })

    if (profileExists) {
      throw new AppError('Profile already exists.')
    }

    const payload = Object.assign({}, { user }, data)

    const profile = await Profile.create(payload)

    return profile
  }
}

export default CreateProfileService
