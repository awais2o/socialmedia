import React, { useState, useRef } from 'react'
import { CloudUpload, CircleX } from 'lucide-react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

const MediaUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(-1) // Track upload progress
  const fileInputRef = useRef(null)

  // Function to handle image selection and upload to Firebase
  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create a storage reference
      const storageRef = ref(storage, `images/${file.name}`)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
          console.log('Upload is ' + progress + '% done')
        },
        error => {
          console.error('Upload failed:', error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL)
            setSelectedImage(URL.createObjectURL(file))
            setUploadProgress(-1)
            onImageUpload(downloadURL)
          })
        }
      )
    }
  }

  // Function to remove the image and reset the input
  const handleRemoveImage = () => {
    setSelectedImage(null)
    setUploadProgress(-1) // Reset progress
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Clear the file input
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <label
        htmlFor='dropzone-file'
        className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
      >
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <CloudUpload className='mb-3' />
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Click to upload</span> or drag and
            drop
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id='dropzone-file'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </label>

      {/* Display progress bar */}
      {uploadProgress > -1 && !selectedImage && (
        <div className='w-full bg-gray-200 rounded mt-2'>
          <div
            className='bg-blue-600 h-2 rounded'
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className='text-center text-sm mt-1'>
            {Math.round(uploadProgress)}% uploaded
          </p>
        </div>
      )}

      {/* Display selected image */}
      {selectedImage && (
        <div className='flex items-center mt-4'>
          <div className='relative'>
            <img
              src={selectedImage}
              alt='Selected'
              className='object-cover rounded-lg w-20 h-20'
            />
            <CircleX
              className='absolute top-0 right-0 m-1 cursor-pointer text-white hover:text-red-600'
              onClick={handleRemoveImage}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaUploader
