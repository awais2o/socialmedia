import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { useNavigate } from 'react-router-dom'
import { CircleArrowLeft, ConstructionIcon } from 'lucide-react'
import MediaUploader from '../Components/MediaUploader' // Import the new component
import { useSelector } from 'react-redux'
import { useCreatePostMutation } from '../redux/GlobalApi'

const CreatePost = () => {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState('') // Store uploaded image URL
  const user = useSelector(state => state.users.value)
  console.log({ reduxuser: user })

  const [doPost, result] = useCreatePostMutation()
  const [post, setPost] = useState({
    uid: user.uid,
    displayName: user.displayName,
    caption: '',
    postURL: ''
  })
  // Callback function to handle the uploaded image URL
  const handleImageUpload = url => {
    setImageUrl(url)
    setPost(state => ({
      ...state,
      postURL: url
    }))
  }
  useEffect(() => {
    if (result.isSuccess) {
      navigate('/')
    }
  }, [result.isSuccess, navigate])
  return (
    <>
      <Nav />
      <header>
        {' '}
        <div className='flex items-center'>
          <CircleArrowLeft
            className='ml-2 w-8 h-8'
            onClick={() => {
              navigate('/')
            }}
          />
          <h2 className='ml-2 text-2xl'>Create Post</h2>
        </div>
      </header>
      <main>
        <div className='flex items-center justify-center w-full mt-4'>
          <div className='w-full max-w-lg mx-auto'>
            <MediaUploader onImageUpload={handleImageUpload} />
          </div>
        </div>

        <div className='mt-4 w-full max-w-lg mx-auto'>
          <h4 className='text-xl mb-2'>Caption:</h4>
          <textarea
            onChange={e => {
              setPost(state => ({
                ...state,
                caption: e.target.value
              }))
            }}
            className='w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-500 resize-none '
            placeholder='Write your caption...'
          />
          <div
            className='w-fit px-3 py-2 mt-2 bg-blue-600 bg-opacity-40 hover:bg-opacity-80 hover:cursor-pointer  rounded'
            onClick={() => {
              doPost(post)
            }}
          >
            Post
          </div>
        </div>
      </main>
    </>
  )
}

export default CreatePost
