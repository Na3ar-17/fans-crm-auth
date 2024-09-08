import cookie from 'js-cookie'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IUser } from '../entities/user.entity'
import { EnumAccessTokenName } from '../types/teken.types'

interface IAuthContext {
  user: IUser | undefined | null
  token: string
  logOut: () => void
  setUser: React.Dispatch<React.SetStateAction<IUser | null | undefined>>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [user, setUser] = useState<IUser | undefined | null>(undefined)
  const [token, setToken] = useState(
    cookie.get(EnumAccessTokenName.accessToken) || ''
  )

  const isAuthPage =
    pathname.includes('/login') || pathname.includes('/register')

  const logOut = () => {
    setUser(null)
    setToken('')
    cookie.remove(EnumAccessTokenName.accessToken)
    navigate('/login')
  }

  useEffect(() => {
    if (!token && !isAuthPage) {
      navigate('/login')
    }

    if (token && isAuthPage) {
      navigate('/profile')
    }
  }, [token, isAuthPage])

  return (
    <AuthContext.Provider value={{ user, token, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
