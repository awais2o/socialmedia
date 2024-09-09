import React from 'react'
import Nav from '../Components/Nav'
import { useNavigate } from 'react-router-dom'
import { CircleArrowLeft } from 'lucide-react'
import PostsComponent from '../Components/PostsComponent'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import showInfoToast from '../assets/toasts'
const HomePage = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.users.value)

  return (
    <>
      <Nav />

      <div
        className='w-fit px-3 py-2 bg-red-600  bg-opacity-40 hover:bg-opacity-80 ml-2 rounded hover:cursor-pointer '
        onClick={() => {
          user.uid ? navigate('/create-post') : showInfoToast('Login First')
        }}
      >
        create new post
      </div>
      <PostsComponent />
    </>
  )
}

export default HomePage
