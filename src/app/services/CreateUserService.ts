import * as Yup from 'yup'
import User from '@models/User.model'
import AppError from '@errors/AppError'

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
})

interface Request {
  email: string
  password: string
  provider: boolean
}

class CreateUserService {
  public async execute(req: Request) {
    if (!(await schema.isValid(req))) {
      throw new AppError('Validation fails')
    }

    const userExists = await User.exists({ where: { email: req.email } })

    if (userExists) {
      throw new AppError('User already exists.')
    }

    const user = await User.create(req)

    return user
  }
}

export default CreateUserService
