import CreateSessionService from '@services/CreateSessionService'
import { Request, Response } from 'express'

class SessionController {
  async store(req: Request, res: Response) {
    const createSession = new CreateSessionService()
    const session = await createSession.execute(req.body)
    return res.json(session)
  }
}

export default new SessionController()
