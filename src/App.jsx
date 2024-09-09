import './App.css'
import CreatePost from './Pages/CreatePost'
import HomePage from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotificaionPage from './Pages/NotificaionPage'
import { onMessage } from 'firebase/messaging'
import { messaging } from './config/firebase'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

function App () {
  useEffect(() => {
    const listenForMessages = async () => {
      onMessage(messaging, payload => {
        console.log('Message received. ', payload)
        // Customize notification display here
        const { title, body } = payload.notification
        new Notification(title, { body })
      })
    }

    listenForMessages()
  }, [])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/notification' element={<NotificaionPage />} />
        </Routes>
      </Router>

      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default App
