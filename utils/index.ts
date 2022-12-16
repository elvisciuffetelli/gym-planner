import Cookies from 'universal-cookie'
import { CookieGetOptions, CookieSetOptions } from 'universal-cookie'
import Router from 'next/router'
import toast from 'react-hot-toast'
import { colors } from '../styles/variables'

export function setCookie(
  name: string,
  value: any,
  options?: CookieSetOptions
) {
  const expires = new Date()
  expires.setTime(expires.getTime() + 3600000 * 24)

  new Cookies().set(
    name,
    typeof value === 'object' ? JSON.stringify(value) : value,
    {
      ...options,
      /*       domain: isClient ? window.location.hostname : undefined,
        path: '/', */
      expires,
    }
  )
}

export function deleteCookie(name: string, options?: CookieSetOptions) {
  new Cookies().remove(name, options)
}

export function getCookie<T = any>(
  name: string,
  options?: CookieGetOptions
): T | undefined {
  return new Cookies().get(name, options)
}

export function redirect(href: string, options?: {}) {
  if (href.indexOf('http') > -1) {
    return window.location.assign(href)
  } else {
    Router.push(href, options)
  }
}

export function showToast(message: string, type: 'success' | 'error') {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'error':
      toast.error(message, {
        style: { backgroundColor: colors.red, color: '#fff' },
      })
      break
    default:
      toast.success(message)
  }
}
