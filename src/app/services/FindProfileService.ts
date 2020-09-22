import Profile from '@models/Profile.model'

interface Request {
  user: string
}

class FindProfileService {
  public async execute({ user }: Request) {
    const profile = await Profile.findOne({ user })

    if (!profile) {
      throw new Error('Profile not found')
    }

    return profile
  }
}

export default FindProfileService
