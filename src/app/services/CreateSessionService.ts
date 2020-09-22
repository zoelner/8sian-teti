import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import authConfig from '@config/auth'
import User from '@models/User.model'

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

interface Request {
  email: string
  password: string
}

class CreateSessionService {
  public async execute(req: Request) {
    if (!(await schema.isValid(req))) {
      throw new Error('Validation fails')
    }

    const { email, password } = req

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('Password does not match')
    }

    return {
      user,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    }
  }
}

export default CreateSessionService
