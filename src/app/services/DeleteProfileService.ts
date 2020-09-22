import Profile from '@models/Profile.model'

interface Request {
  user: string
}

class DeleteProfileService {
  public async execute({ user }: Request): Promise<void> {
    const profile = await Profile.findOneAndDelete({ user })

    if (!profile) {
      throw new Error('Profile not found')
    }

    return
  }
}

export default DeleteProfileService
