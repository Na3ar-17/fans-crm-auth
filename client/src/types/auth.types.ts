import { IUser } from '../entities/user.entity'

export interface IAuthDto
  extends Pick<IUser, 'email' | 'password' | 'fullName'> {}

export interface IAuthResponse {
  user: IUser
  accessToken: string
}
