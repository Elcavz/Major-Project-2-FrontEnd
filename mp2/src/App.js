import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './authentication.css';
import './App.css';
import Register from './Authentication/register';
import Login from './Authentication/login';
import Home from './Home/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path='/'>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;