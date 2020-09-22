import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '@config/auth'
import { NextFunction, Response, Request } from 'express'

interface IToken {
  id: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
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
    return res.status(401).json({ error: 'Token invalid' })
  }
}
