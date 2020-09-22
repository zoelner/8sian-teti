import CreateSessionService from '@services/CreateSessionService'
import { Request, Response } from 'express'

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const createSession = new CreateSessionService()
      const session = await createSession.execute(req.body)
      return res.json(session)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}

export default new SessionController()
