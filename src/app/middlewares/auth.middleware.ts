import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '@config/auth'
import { NextFunction, Response, Request } from 'express'
import AppError from '@errors/AppError'

interface IToken {
  id: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = (await promisify(jwt.verify)(
      token,
      authConfig.secret
    )) as IToken
    req.user = { id: decoded.id }
    return next()
  } catch (err) {
    throw new AppError('Invalid JWT Token')
  }
}
