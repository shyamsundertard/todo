import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { onLogout } from '../api/auth'
import { useDispatch } from 'react-redux'
import "../styles/Navbar.css"
import { useState } from 'react'

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [search, setSearch] = useState()

  const logout = async () => {
    try {

      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <nav className='navbarGrid'>
      <div className='dashboardContainer'>

        {isAuth ? (
            <div className='dashB'>
              <div className='dshbd'>
            <NavLink to='/todo/dashboard'>
              <div>Dashboard</div>
            </NavLink>
            </div>
            <div>
              <input className='searchBar'
              type='text'
              placeholder='Search...'
              onChange={(e)=>setSearch(e.target.value)}
              />
            </div>
            <button 
            onClick={() => logout()} 
            className='logoutButton'
            >Logout</button>
            </div>
        ) : (
          <div className='loginSignup'>
            <div className='loginBtn'>
            <NavLink to='/todo/login'>
              <span>Login</span>
            </NavLink>
            </div>
            <div className='registerBtn'>
            <NavLink to='/todo/register' className='mx-3'>
              <span>Register</span>
            </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar