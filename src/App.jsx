import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
  <Navbar/>
  <div className='principal'>
   <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/profile/:id" element={<ProfilePage/>}/>

    </Routes>
  </div>
    </>
  )
}

export default App
