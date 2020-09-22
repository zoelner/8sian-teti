import * as Yup from 'yup'
import User from '@models/User.model'

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
})

interface Request {
  email: string
  password: string
}

class CreateUserService {
  public async execute(req: Request) {
    if (!(await schema.isValid(req))) {
      throw new Error('Validation fails')
    }

    const userExists = await User.exists({ where: { email: req.email } })

    if (userExists) {
      throw new Error('User already exists.')
    }

    const user = await User.create(req)

    return user
  }
}

export default CreateUserService
