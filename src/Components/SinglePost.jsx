import React, { useState, useRef } from 'react'
import FullScreenImage from './FullScreenImage'
import { Heart, MessageCircle } from 'lucide-react'
import { useHandleLikesMutation } from '../redux/GlobalApi'
import { useSelector } from 'react-redux'
import FullScreenComment from './FullScreenComment'

const SinglePost = ({ post }) => {
  // postId, uid, commentText, username, profilePictureURL
  const [isLoading, setIsLoading] = useState(true)
  const placeholder = '/imagePlaceHolder.png'
  const [display, setDisplay] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const user = useSelector(state => state.users.value)
  const [like] = useHandleLikesMutation()
  const [liked, setLiked] = useState(post.likesUID?.includes(user.uid))
  const clickTimeout = useRef(null) // Ref to manage single-click timeout
  const [displayComments, setDisplayComments] = useState(false)

  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked)

    const body = {
      postId: post.postId,
      uid: user.uid
    }

    like(body)
  }

  const handleSingleClick = () => {
    setImageUrl(post.postURL)
    setDisplay(true)
  }

  const handleImageClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current) // Clear timeout if double-click happens
    }

    // Set a timeout for single-click action
    clickTimeout.current = setTimeout(() => {
      handleSingleClick()
      clickTimeout.current = null
    }, 250) // Delay to differentiate single and double-click
  }

  const handleImageDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current) // Clear the timeout to prevent single click
      clickTimeout.current = null
    }
    handleLikeClick() // Perform double-click action (like post)
  }

  return (
    <div
      key={post.postId}
      className='max-w-lg mx-auto my-5 p-6 bg-white dark:bg-slate-600 rounded-lg shadow-md'
    >
      <div className='flex items-center space-x-4'>
        {/* Placeholder for Profile Picture */}
        <div className='w-12 h-12 bg-gray-300 rounded-full'>
          <img
            src={post.ProfilePhotoURL}
            alt='PP'
            className='rounded-full'
            onClick={() => {
              setImageUrl(post.ProfilePhotoURL)
              setDisplay(true)
            }}
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold'>{post.displayName}</h3>
          <p className='text-sm text-gray-600 dark:text-gray-100'>
            {post.createdAt.toDate().toLocaleString()}
          </p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-gray-800 dark:text-gray-100 text-sm'>
          {post.caption}
        </p>
      </div>
      {/* Post Image */}
      <div className='mt-4'>
        <img
          src={isLoading ? placeholder : post.postURL}
          alt='Post Image'
          className='w-full h-96 rounded-lg object-cover object-center'
          onLoad={() => setIsLoading(false)} // Image loaded, hide placeholder
          onError={() => setIsLoading(false)} // Handle image load error
          onClick={handleImageClick} // Handle single click with delay
          onDoubleClick={handleImageDoubleClick} // Handle double click (like post)
        />
      </div>

      <div className='mt-4 flex justify-between items-center'>
        <div className='flex space-x-4'>
          <span className='text-gray-500 dark:text-gray-100'>
            <Heart
              fill={liked ? 'red' : 'none'} // Update fill based on local state
              onClick={handleLikeClick} // Handle click to update state and call API
            />
          </span>
          <span className='text-gray-500 dark:text-gray-100'>
            <MessageCircle onClick={() => setDisplayComments(true)} />
          </span>
        </div>
      </div>

      {display && (
        <FullScreenImage
          imageUrl={imageUrl}
          onClose={() => setDisplay(false)}
          onClick={() => setDisplay(true)}
        />
      )}
      {displayComments && (
        <FullScreenComment
          // comments={comments}
          onClose={() => setDisplayComments(false)}
          postId={post.postId}
        />
      )}
    </div>
  )
}

export default SinglePost
