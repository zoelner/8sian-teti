import { Request, Response } from 'express'
import CreateUserService from '@services/CreateUserService'
import UpdateUserService from '@services/UpdateUserService'

class UserController {
  async store(req: Request, res: Response) {
    const createUser = new CreateUserService()
    const user = await createUser.execute(req.body)
    return res.json(user)
  }

  async update(req: Request, res: Response) {
    const updateUser = new UpdateUserService()
    const user = await updateUser.execute(req.body, req.user.id)
    return res.json(user)
  }
}

export default new UserController()
