import Cookies from 'universal-cookie'
import {CookieGetOptions, CookieSetOptions} from 'universal-cookie'
import { isClient } from './constants'
import Router from 'next/router'

export function setCookie(name: string, value: any, options?: CookieSetOptions) {
    const expires = new Date()
    expires.setTime(expires.getTime() + 3600000 * 24)

    new Cookies().set(name, typeof value === 'object' ? JSON.stringify(value) : value, {
        ...options,
  /*       domain: isClient ? window.location.hostname : undefined,
        path: '/', */
        expires
    })
}

export function deleteCookie(name: string, options?: CookieSetOptions) {
    new Cookies().remove(name, options)
}

export function getCookie<T = any>(name: string, options?: CookieGetOptions): T | undefined {
    return new Cookies().get(name, options)
}

export function redirect(href: string, options?: {}) {
    if(href.indexOf('http') > -1) {
        return window.location.assign(href)
    } else {
        Router.push(href, options)
    }
}