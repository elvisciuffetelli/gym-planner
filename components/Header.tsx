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
    <header className="flex justify-between shadow-md py-4 px-2">
      <Link href="/" className='flex items-center'>
        <FaHome />
      </Link>
      <ul className="flex space-x-6">
        {user ? (
          <li>
            <button className="flex items-center" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login" className="flex items-center">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="flex items-center">
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
