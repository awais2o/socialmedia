import React from 'react'

const SinglePost = ({ post }) => {
  return (
    <div
      key={post.postId}
      className='max-w-lg mx-auto my-5 p-6 bg-white dark:bg-slate-600 rounded-lg shadow-md'
    >
      <div className='flex items-center space-x-4'>
        {/* Placeholder for Profile Picture */}
        <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
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
          src={post.postURL}
          alt='Post Image'
          className='w-full h-auto rounded-lg object-cover'
        />
      </div>

      <div className='mt-4 flex justify-between items-center'>
        <div className='flex space-x-4'>
          <span className='text-gray-500 dark:text-gray-100'>
            {post.likesCount} Likes
          </span>
          <span className='text-gray-500 dark:text-gray-100'>
            {post.commentsCount} Comments
          </span>
        </div>
        <a
          href={post.postURL}
          target='_blank'
          className='text-blue-500 hover:underline'
        >
          View Full Image
        </a>
      </div>
    </div>
  )
}

export default SinglePost
