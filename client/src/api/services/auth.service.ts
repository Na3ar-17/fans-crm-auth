import { IAuthDto, IAuthResponse } from '@/src/types/auth.types'
import { errorHandler } from '../error-handler'
import { axiosClassic } from '../interceptors'

class AuthService {
  private URL = '/auth'
  async register(dto: IAuthDto): Promise<IAuthResponse> {
    try {
      const { data } = await axiosClassic.post(`${this.URL}/register`, dto)
      return data
    } catch (error) {
      errorHandler(error)
      throw error
    }
  }
  async login(dto: IAuthDto): Promise<IAuthResponse> {
    try {
      const { data } = await axiosClassic.post(`${this.URL}/login`, dto)
      return data
    } catch (error) {
      errorHandler(error)
      throw error
    }
  }
}

export const authService = new AuthService()
