import { Request, Response } from 'express'
import CreateUserService from '@services/CreateUserService'
import UpdateUserService from '@services/UpdateUserService'

class UserController {
  async store(req: Request, res: Response) {
    try {
      const createUser = new CreateUserService()
      const user = await createUser.execute(req.body)
      return res.json(user)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateUser = new UpdateUserService()
      const user = await updateUser.execute(req.body, req.user.id)
      return res.json(user)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}

export default new UserController()
