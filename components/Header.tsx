import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { useAuthentication } from '../customHooks/useAuthentication'
import { deleteCookie } from '../utils'
import { useRouter } from 'next/router'
import { FaHome } from 'react-icons/fa'

function Header() {
  const router = useRouter()
  const { user } = useAuthentication()
  const onLogout = () => {
    deleteCookie('user')
    router.push('/login')
  }

  return (
    <header className="flex justify-between shadow-md">
      <div className="">
        <Link href="/">
          <FaHome />
        </Link>
      </div>
      <ul className="flex space-x-6">
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login" className="flex">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="flex">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
