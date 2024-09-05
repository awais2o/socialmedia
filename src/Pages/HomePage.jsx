import React from 'react'
import Nav from '../Components/Nav'
import { useNavigate } from 'react-router-dom'
import { CircleArrowLeft } from 'lucide-react'
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Nav />

      <div
        className='w-fit px-3 py-2 bg-red-600  bg-opacity-40 hover:bg-opacity-80 ml-2 rounded hover:cursor-pointer '
        onClick={() => {
          navigate('/create-post')
        }}
      >
        create new post
      </div>
    </>
  )
}

export default HomePage
