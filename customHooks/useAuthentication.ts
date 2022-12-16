import { User } from './../types/index'
import { useEffect, useState } from 'react'
import { getCookie } from '../utils'
import { useRouter } from 'next/router'

export function useAuthentication(props?: { redirectTo?: string }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>()

  const userRetrieved = getCookie('user')

  useEffect(() => {
    if (!userRetrieved) {
      setUser(null)
      props?.redirectTo && router.push(props.redirectTo)
    }
    !user && setUser(userRetrieved)
  }, [props, router, user, userRetrieved])

  return { user }
}
