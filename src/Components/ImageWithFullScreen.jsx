import React, { useState, useEffect } from 'react'

const FullScreenImage = ({ imageUrl, onClose }) => {
  // Handle "ESC" key press to close the modal
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose() // Close modal when ESC is pressed
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
      <img
        src={imageUrl}
        alt='Full-screen'
        className='max-w-full max-h-full object-contain'
      />
      {/* Close Button */}
      <button
        className='absolute top-4 right-4 text-white text-2xl font-bold'
        onClick={onClose}
      >
        &times; {/* Close icon */}
      </button>
    </div>
  )
}

export default FullScreenImage
