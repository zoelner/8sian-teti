import * as Yup from 'yup'
import Profile from '@models/Profile.model'

const schema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  address: Yup.string(),
  addressNumber: Yup.number(),
  complement: Yup.string(),
  birthDate: Yup.date(),
})

interface Request {
  user: string
  data: Yup.InferType<typeof schema>
}

class UpdateProfileService {
  public async execute({ user, data }: Request) {
    if (!schema.isValidSync(data)) {
      throw new Error('Validation fails')
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      throw new Error('Profile not found')
    }

    await profile.updateOne(data)

    return profile
  }
}

export default UpdateProfileService
