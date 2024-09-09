import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore' // Import Firestore

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig)

// Initialize Firebase Services
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const messaging = getMessaging(app)
export const firestore = getFirestore(app)

googleProvider.setCustomParameters({
  prompt: 'select_account'
})
