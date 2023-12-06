import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  
  const [toggle,setToggle] = useState(false)

  const Toggle = () => {
      setToggle(!toggle)
  }


  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <BrowserRouter>       

        <div className='row'>
            <Navbar Toggle={Toggle}/> 
          
          { toggle && <div className="col-2 bg-white vh-100 sideBar">
            <Sidebar />
          </div>
          }
          
          <div className="pages col">
            <Routes>

              <Route path="/" element={<Home/>} />

            </Routes>
          </div>

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
