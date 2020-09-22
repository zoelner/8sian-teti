import { json, Request, Response } from 'express'
import Profile from '@models/Profile.model'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  addressNumber: Yup.number().required(),
  complement: Yup.string().required(),
  birthDate: Yup.date().required(),
})

class ProfileController {
  async index(req: Request, res: Response) {
    const user = req.user.id

    try {
      const profile = await Profile.findOne({ user })

      if (!profile) {
        return res.status(400).json({ error: 'Profile not found' })
      }

      return res.json(profile)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async store(req: Request, res: Response) {
    const user = req.user.id

    if (!schema.isValidSync(req.body)) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const profileExists = await Profile.exists({ user })

    if (profileExists) {
      return res.json({ error: 'Profile already exists.' })
    }

    const data = Object.assign({}, { user }, req.body)

    const profile = await Profile.create(data)

    return res.json(profile)
  }

  async update(req: Request, res: Response) {
    const user = req.user.id

    if (!schema.isValidSync(req.body)) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      return res.status(400).json({ error: 'Profile not found' })
    }

    await profile.updateOne(req.body)

    return res.json(req.body)
  }

  async delete(req: Request, res: Response) {
    const user = req.user.id

    try {
      const profile = await Profile.findOneAndDelete({ user })

      if (!profile) {
        return res.status(400).json({ error: 'Profile not found' })
      }

      return res.status(200).send()
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new ProfileController()
