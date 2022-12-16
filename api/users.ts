import { Login } from '../types'
import { redirect, setCookie } from '../utils'
import request from './request'

export function login(body: { email: string; password: string }) {
  request<Login>('post', `/api/users/login`, body)
    .then((res) => {
      if (res.token) {
        setCookie('user', res)
        redirect('/')
      }
    })
    .catch(() => {
      throw new Error('Si è verificato un errore, riprova')
    })
}

export function register(body: {
  name: string
  email: string
  password: string
}) {
  request('post', `/api/users`, body)
    .then((res) => {
      if (res) {
        redirect('/login')
      }
    })
    .catch(() => {
      throw new Error('Si è verificato un errore, riprova')
    })
}
