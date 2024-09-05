importScripts(
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js'
)

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYJ9IkFv9rxP7RVacKhn2Fk9zWR3wQoH0',
  authDomain: 'social-media-7d6d0.firebaseapp.com',
  projectId: 'social-media-7d6d0',
  storageBucket: 'social-media-7d6d0.appspot.com',
  messagingSenderId: '60093240797',
  appId: '1:60093240797:web:c76a8ea82ff9cb4266d234',
  measurementId: 'G-B7J8MWTFKM'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
