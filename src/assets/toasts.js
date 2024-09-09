import toast from 'react-hot-toast'
// import { InformationCircleIcon } from '@heroicons/react/outline' // Optional icon for info

const showInfoToast = message => {
  toast(message, {
    // icon: 'ℹ️', // You can use a custom emoji or icon here
    style: {
      border: '1px solid #f59e0b', // Yellow border
      padding: '5px',
      background: 'rgba(252, 211, 77, 0.5)', // Yellow background with 50% opacity
      color: '#f59e0b' // Yellow text color
    },
    duration: 5000 // Set duration for 5 seconds
  })
}

export default showInfoToast
