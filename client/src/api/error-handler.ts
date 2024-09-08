import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { IApiError } from '../types/error.types'

/* eslint-disable @typescript-eslint/no-explicit-any */
function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError
}

export const errorHandler = (error: any) => {
  if (isAxiosError(error)) {
    if (error.response) {
      const res = error.response.data as IApiError
      toast.error(res.message)
    } else {
      toast.error('Something went wrong')
    }
  }
}
