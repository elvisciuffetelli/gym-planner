import { Login } from '../types'
import { redirect, setCookie, showToast } from '../utils'
import request from './request'

export function login(
  body: { email: string; password: string },
  setSubmitting: (isSubmitting: boolean) => void
) {
  request<Login>('post', `/api/users/login`, body)
    .then((res) => {
      if (res.token) {
        setCookie('user', res)
        redirect('/')
      }
    })
    .catch(({ error }) => {
      showToast(error, 'error')
    })
    .finally(() => {
      setSubmitting(false)
    })
}

export function register(body: {
  name: string
  email: string
  password: string
},  setSubmitting: (isSubmitting: boolean) => void) {
  request('post', `/api/users`, body)
    .then((res) => {
      if (res) {
        redirect('/login')
      }
    })
    .catch(({error}) => {
      showToast(error, 'error')
    })
    .finally(() => {
      setSubmitting(false)
    })
}
