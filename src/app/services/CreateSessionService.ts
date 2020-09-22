import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import authConfig from '@config/auth'
import User from '@models/User.model'
import AppError from '@errors/AppError'

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
      throw new AppError('Validation fails')
    }

    const { email, password } = req

    const user = await User.findOne({ email })

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError('Password does not match', 401)
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
