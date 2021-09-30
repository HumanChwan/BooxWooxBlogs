import React, { useState } from 'react'
import './nav.css'
import logo from '../../assets/Logo.svg'
import chevronDown from '../../assets/chevron-down.svg'
import userIcon from '../../assets/user.svg'
import pen from '../../assets/pen.svg'
import drafts from '../../assets/drafts.svg'
import logout from '../../assets/logout.svg'
import profPic from '../images/img-1.jpg'
import { Link } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

import LoginModal from './loginModal'

function Navbar() {
  // const [OTPToken, setOTPToken] = useState("");
  // const [loginToken, setLoginToken] = useState("");
  const { user, setUser, showOverlay, setShowOverlay } = useUser()

  const [click, setClick] = useState(false)

  const iconChange = () => setClick((prevClick) => !prevClick)
  const closeSideMenu = () => setClick(false)

  const checkSideMenuSize = () => {
    if (window.innerWidth >= 800) {
      closeSideMenu()
    }
  }

  window.addEventListener('resize', checkSideMenuSize)
  window.addEventListener('scroll', closeSideMenu)

  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showUserMenuSide, setShowUserMenuSide] = useState(false)

  return (
    <div className='nav-container'>
      <nav
        className='navbar'
        onBlur={() => {
          setTimeout(() => {
            setShowUserMenu(false)
          }, 100)
        }}
        tabIndex='0'
      >
        <div className='logo' onClick={closeSideMenu}>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>

        <div className='menu-bar-icon' onClick={iconChange}>
          <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
        </div>

        <div className='nav-row'>
          <Link to='/features' className='nav-link' id='feat'>
            Features
          </Link>
          <Link to='/blogs' className='nav-link' id='blog'>
            Blogs
          </Link>
          <Link to='/downloads' className='nav-link' id='down'>
            Downloads
          </Link>
          {!user ? (
            <button
              className='nav-link-side'
              id='log-side'
              onClick={() => {
                closeSideMenu()
                setShowOverlay(!showOverlay)
              }}
            >
              Login
            </button>
          ) : (
            <div id='user-side'>
              <div id='user' onClick={() => setShowUserMenu(!showUserMenu)}>
                <img id='prof-pic' src={profPic} alt='author' />
                {user.username}
              </div>
            </div>
          )}
        </div>
        {showUserMenu && (
          <div id='user-menu'>
            <Link to='/' className='user-menu-item'>
              <img src={userIcon} className='icon' alt='user-icon' />
              My Account
            </Link>
            <Link to='/my-blogs' className='user-menu-item'>
              <img src={pen} className='icon' alt='pen-icon' />
              My Blogs
            </Link>
            <Link to='/my-drafts' className='user-menu-item'>
              <img src={drafts} className='icon' alt='draft-icon' />
              My Drafts
            </Link>
            <Link
              to='/'
              className='user-menu-item'
              onClick={() => {
                setUser(undefined)
                setShowUserMenu(false)
              }}
            >
              <img src={logout} className='icon' alt='logout-icon' />
              Logout
            </Link>
          </div>
        )}
      </nav>
      <div id='side-menu-container'>
        <ul className={click ? 'side-menu-active' : 'side-menu'}>
          <li className='side-menu-item'>
            <Link
              to='/features'
              className='nav-link-side'
              onClick={closeSideMenu}
            >
              Features
            </Link>
          </li>
          <li className='side-menu-item'>
            <Link
              to='/blogs'
              className='nav-link-side'
              id='blog-side'
              onClick={closeSideMenu}
            >
              Blogs
            </Link>
          </li>
          <li className='side-menu-item'>
            <Link
              to='/downloads'
              className='nav-link-side'
              onClick={closeSideMenu}
            >
              Downloads
            </Link>
          </li>
          <li className='side-menu-item'>
            {!user ? (
              <span
                className='nav-link-side'
                id='log-side'
                onClick={() => {
                  closeSideMenu()
                  setShowOverlay(!showOverlay)
                }}
              >
                Login
              </span>
            ) : (
              <div id='side-user'>
                <div
                  id='username-side'
                  onClick={() => setShowUserMenuSide(!showUserMenuSide)}
                >
                  <img id='prof-pic' src={profPic} alt='author' />
                  {user.username}
                  <img
                    id={
                      showUserMenuSide
                        ? 'chevron-up-username'
                        : 'chevron-down-username'
                    }
                    alt='chevron'
                    src={chevronDown}
                  />
                </div>
                {showUserMenuSide ? (
                  <div
                    id='user-menu-side'
                    onBlur={() => {
                      setShowUserMenu(false)
                    }}
                    tabIndex='0'
                  >
                    <Link to='/my-account' className='user-menu-item'>
                      <img src={userIcon} className='icon' alt='user-icon' />
                      My Account
                    </Link>
                    <Link to='/my-blogs' className='user-menu-item'>
                      <img src={pen} className='icon' alt='pen-icon' />
                      My Blogs
                    </Link>
                    <Link to='/my-drafts' className='user-menu-item'>
                      <img src={drafts} className='icon' alt='draft-icon' />
                      My Drafts
                    </Link>
                    <Link
                      to='/'
                      className='user-menu-item'
                      onClick={() => {
                        setUser(undefined)
                        setShowUserMenu(false)
                      }}
                    >
                      <img src={logout} className='icon' alt='logout-icon' />
                      Logout
                    </Link>
                  </div>
                ) : null}
              </div>
            )}
          </li>
        </ul>
      </div>
      <LoginModal showOverlay={showOverlay} setShowOverlay={setShowOverlay} />
    </div>
  )
}

export default Navbar
