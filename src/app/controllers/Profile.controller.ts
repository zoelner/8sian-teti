import { Request, Response } from 'express'
import FindProfileService from '@services/FindProfileService'
import CreateProfileService from '@services/CreateProfileService'
import UpdateProfileService from '@services/UpdateProfileService'
import DeleteProfileService from '@services/DeleteProfileService'

class ProfileController {
  async index(req: Request, res: Response) {
    const user = req.user.id

    const findProfile = new FindProfileService()
    const profile = await findProfile.execute({ user })

    return res.json(profile)
  }

  async store(req: Request, res: Response) {
    const user = req.user.id

    const createProfile = new CreateProfileService()
    const profile = await createProfile.execute({ user, data: req.body })

    return res.json(profile)
  }

  async update(req: Request, res: Response) {
    const user = req.user.id

    const updateProfile = new UpdateProfileService()
    const profile = updateProfile.execute({ user, data: req.body })

    return res.json(profile)
  }

  async delete(req: Request, res: Response) {
    const user = req.user.id
    const deleteProfile = new DeleteProfileService()

    await deleteProfile.execute({ user })

    return res.status(200).send()
  }
}

export default new ProfileController()
