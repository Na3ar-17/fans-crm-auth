import cookie from 'js-cookie'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authService } from '../../../../api/services/auth.service'
import { IAuthDto, IAuthResponse } from '../../../../types/auth.types'
import { EnumAccessTokenName } from '../../../../types/teken.types'
import { useAuth } from '../../../AuthProvider'
import './AuthForm.css'
import Fields from './fields/Fields'

interface IProps {
  isRegister: boolean
}

const AuthForm = ({ isRegister }: IProps) => {
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading, isSubmitting, isSubmitted },
  } = useForm<IAuthDto>({
    mode: 'onChange',
  })
  const isDisabled = !isValid || isLoading || isSubmitting || isSubmitted

  const handleSuccessAuth = (data: IAuthResponse) => {
    auth?.setUser(data.user)
    cookie.set(EnumAccessTokenName.accessToken, data.accessToken)
    window.location.reload()
  }

  const onSubmit = async (dto: IAuthDto) => {
    if (isRegister) {
      await authService
        .register(dto)
        .then((data) => handleSuccessAuth(data))
        .catch((err) => {
          auth?.setUser(null)
          throw new Error(err)
        })
    } else {
      authService
        .login(dto)
        .then((data) => handleSuccessAuth(data))
        .catch((err) => {
          auth?.setUser(null)
          throw new Error(err)
        })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex bg-[#1e293b] flex-col px-5 gap-3 py-6 rounded-md"
    >
      <p className="text-2xl text-white font-semibold">
        {isRegister ? 'Sign Up' : 'Sign In'}
      </p>
      <Fields
        errors={errors}
        isRegister={isRegister}
        register={register}
        isButtonDisabled={isDisabled}
      />
      <p className="toggle-form">
        {isRegister ? 'Already have an account? ' : "Don't have an account? "}
        <span>
          <Link to={isRegister ? '/login' : '/register'}>
            {!isRegister ? 'Sign Up' : 'Sign In'}
          </Link>
        </span>
      </p>
    </form>
  )
}

export default AuthForm
