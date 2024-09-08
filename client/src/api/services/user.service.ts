import { IUser } from '@/src/entities/user.entity'
import { errorHandler } from '../error-handler'
import { axiosWithAuth } from '../interceptors'

class UserService {
  private URL = 'user'

  async getProfile(): Promise<IUser> {
    try {
      const { data } = await axiosWithAuth.get(`${this.URL}/profile`)
      return data
    } catch (error) {
      errorHandler(error)
      throw error
    }
  }
}

export const userService = new UserService()
