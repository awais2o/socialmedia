import { getToken } from 'firebase/messaging'
import { messaging } from '../config/firebase'

export const requestNotificationPermission = async (
  uid,
  saveTokenToBackend
) => {
  try {
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    )

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VIPID, // Replace with your VAPID key
      serviceWorkerRegistration: registration // Use the registered service worker
    })

    if (token) {
      console.log('FCM Token:', token)
      await saveTokenToBackend(token)
    } else {
      console.log('No FCM token available. Request permission.')
    }
  } catch (error) {
    console.error('Error while getting FCM token:', error)
  }
}
