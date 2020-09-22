import * as Yup from 'yup'
import User from '@models/User.model'

const schema = Yup.object().shape({
  email: Yup.string().email(),
  oldPassword: Yup.string().min(6),
  password: Yup.string()
    .min(6)
    .when('oldPassword', (oldPassword: string, field: Yup.StringSchema) =>
      oldPassword ? field.required() : field
    ),
  confirmPassword: Yup.string().when(
    'password',
    (password: string, field: Yup.StringSchema) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
})

interface Request {
  email: string
  password: string
  oldPassword: string
  confirmPassword: string
}

class UpdateUserService {
  public async execute(req: Request, id: string) {
    if (!(await schema.isValid(req))) {
      throw new Error('Validation fails')
    }
    const { email, oldPassword } = req

    const user = await User.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } })

      if (userExists) {
        throw new Error('User already exists.')
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new Error('Password does not match')
    }

    await user.updateOne(req)

    const updatedUser = await User.findById(id)

    return updatedUser
  }
}

export default UpdateUserService
