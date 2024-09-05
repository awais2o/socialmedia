import './App.css'
import CreatePost from './Pages/CreatePost'
import HomePage from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
