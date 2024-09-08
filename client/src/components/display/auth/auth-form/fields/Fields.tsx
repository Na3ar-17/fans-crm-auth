import { IAuthDto } from '@/src/types/auth.types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IProps {
  register: UseFormRegister<IAuthDto>
  errors: FieldErrors<IAuthDto>
  isRegister: boolean
  isButtonDisabled: boolean
}

const Fields = ({ register, errors, isRegister, isButtonDisabled }: IProps) => {
  return (
    <div className="flex gap-4 flex-col">
      <label className="label">
        <span>Email</span>
        <input
          className="input"
          type="email"
          placeholder="Enter email"
          {...register('email', {
            required: {
              value: true,
              message: 'This is required field',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email',
            },
          })}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </label>
      <label className="label">
        <span>Password</span>
        <input
          className="input"
          type="password"
          placeholder="Enter password"
          {...register('password', {
            required: {
              value: true,
              message: 'This is required field',
            },
            minLength: {
              value: 6,
              message: 'At least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </label>
      {isRegister && (
        <label className="label">
          <span>Full name</span>
          <input
            className="input"
            type="text"
            placeholder="Enter full name"
            {...register('fullName', {
              required: {
                value: true,
                message: 'This is required field',
              },
              pattern: {
                value: /^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/,
                message: 'Invalid full name',
              },
            })}
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName.message}</span>
          )}
        </label>
      )}
      <button
        className="px-3 disabled:cursor-not-allowed disabled:bg-opacity-30 focus-within:bg-[#436fba]  transition-colors hover:bg-opacity-80 py-2 rounded-[4px] font-semibold bg-[#3c82f7] text-white"
        type="submit"
        disabled={isButtonDisabled}
      >
        Submit
      </button>
    </div>
  )
}

export default Fields
