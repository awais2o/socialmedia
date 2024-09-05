import { ChevronDown, Info, Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../utils/theme'
import { updateTheme } from '../redux/themeSlice'
import { handleGoogleSignIn, handleSignOut } from '../utils/auth'
import LogoutConfirm from './LogoutConfirm'
import { useNavigate } from 'react-router-dom'
import { requestNotificationPermission } from '../utils/requestNotificationPermission'

const Nav = () => {
  const [logoutDisplay, setLogoutDisplay] = useState(false)

  const [isScrolled, setIsScrolled] = useState(false)
  const darkMode = useSelector(state => state.theme.value)
  const user = useSelector(state => state.users.value)

  const saveTokenToBackend = async token => {
    try {
      const response = await fetch('http://localhost:5000/api/save-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, userId: user?.uid }) // Make sure you send the token and userId
      })

      if (!response.ok) {
        throw new Error('Failed to save FCM token to backend')
      }

      console.log('FCM token saved successfully to backend')
    } catch (error) {
      console.error('Error saving FCM token:', error)
    }
  }
  useEffect(() => {
    user?.uid && requestNotificationPermission(user?.uid, saveTokenToBackend)
  }, [user])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <nav
        className={`flex items-center justify-between w-full px-3 py-2 transition-all duration-300 dark:text-white  border-b transform ease-in-out duration-1000 translate-y-1  ${
          isScrolled
            ? 'fixed top-0 left-0 d bg-gray-100 dark:bg-gray-950   transform ease-in-out duration-1000 translate-y-0 drop-shadow-lg dark:shadow-white  dark:shadow-sm'
            : 'bg-inherit'
        }`}
      >
        <h3
          className=' text-red-600 text-2xl p-2 hover-transition font-serif hover:cursor-pointer'
          onClick={() => {
            navigate('/')
          }}
        >
          FireMedia
        </h3>

        <div className='flex space-x-2'>
          <div className='py-2 px-4 hover:cursor-pointer'>
            {!darkMode ? (
              <Sun
                className='hover-transition hover:fill-black '
                onClick={() => {
                  toggleDarkMode(darkMode)
                  dispatch(updateTheme())
                }}
              />
            ) : (
              <Moon
                className='hover-transition hover:fill-black scale-90'
                onClick={() => {
                  toggleDarkMode(darkMode)
                  dispatch(updateTheme())
                }}
              />
            )}
          </div>
          {!user?.uid ? (
            <div
              onClick={() => {
                handleGoogleSignIn(dispatch)
                // handleFacebookLogin()
              }}
              className=' hover-transition hover:font-bold py-2 px-4 rounded-3xl hover:cursor-pointer
'
            >
              Login
            </div>
          ) : (
            <>
              <div className='flex items-center space-x-2'>
                <p>{user.displayName}</p>
                <img
                  onClick={() => {
                    setLogoutDisplay(true)
                  }}
                  src={user.photoURL}
                  alt='User Profile'
                  className='w-10 h-10 rounded-full border-2 border-gray-300 hover:cursor-pointer'
                />
                <ChevronDown className='w-5 h-5' />
              </div>
            </>
          )}
        </div>
      </nav>
      <div
        className='mt-4 flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-600 bg-opacity-10 dark:bg-gray-800 dark:text-blue-400'
        role='alert'
      >
        <Info></Info>
        <span className='sr-only '>Info</span>
        <div>
          <span className='font-medium ml-2'>Info alert!</span> Change a few
          things up and try submitting again.
        </div>
      </div>

      {logoutDisplay && (
        <LogoutConfirm
          handleSignOut={handleSignOut}
          setLogoutDisplay={setLogoutDisplay}
        />
      )}
    </>
  )
}

export default Nav
