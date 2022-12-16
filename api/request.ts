import { getCookie } from '../utils'

export async function fetcher(url: string) {
  const user = getCookie('user')
  const headers: { [key: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (user?.token) {
    headers['Authorization'] = `Bearer ${user?.token}`
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_HOST + url, { headers })
  if (!res.ok) {
    const error: any = new Error('API error')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return await res.json()
}

export default function request<T = {}>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  body?: any
) {
  const user = getCookie('user')
  const headers: { [key: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (user?.token) {
    headers['Authorization'] = `Bearer ${user?.token}`
  }

  return new Promise<T>((resolve, reject) => {
    fetch(process.env.NEXT_PUBLIC_API_HOST + url, {
      method,
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return reject(data)
        } else {
          return resolve(data)
        }
      })
      .catch((err) => reject(err))
      .catch((err) => reject(err))
  })
}
