import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          
          <Route path="/" element={<Home/>} />

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
