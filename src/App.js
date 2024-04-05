import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
// import Blog from './components/Blog';
import Signup from './components/Signup'
import Blog from './components/Blog';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Navigate to="/signup" />}/>
            <Route exact path="/signup" element={<Signup />}/>
            <Route exact path="/home" element={<Home />} />
            <Route exact path='/blog' element={<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
