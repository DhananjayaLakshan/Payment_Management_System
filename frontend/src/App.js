import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import AddTask from './components/AddTask'



function App() {

  const { user } = useAuthContext()
  const [toggle, setToggle] = useState(false)

  const Toggle = () => {
    setToggle(!toggle)
  }


  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <BrowserRouter>

        <div className='row'>
          <Navbar Toggle={Toggle} />

          {toggle && <div className="col-2 bg-white vh-100 sideBar">
            <Sidebar />
          </div>
          }

          <div className="pages col">
            <Routes>

              <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />

              <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />

              <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />

              <Route path="/addTask" element={user ? <AddTask /> : <Navigate to='/login' />} />

            </Routes>
          </div>

        </div>

      </BrowserRouter>
    </div>
  )
}

export default App;
