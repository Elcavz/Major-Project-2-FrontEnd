import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './authentication.css';
import './App.css';
import Register from './Authentication/register';
import Login from './Authentication/login';
import Home from './Home/home';

function App() {
  const userToken = localStorage.getItem('token: ');
  console.log('myToken: ', userToken)
  const pathnameLogin = document.location.pathname === '/login'
  const pathnameRegister = document.location.pathname === '/register'

  if ((!pathnameLogin && !pathnameRegister) && !userToken) {
    document.location.href = 'login';
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        {userToken ? 
        <Route path='/'>
          <Route index element={<Home/>}/>
        </Route>
        : '' }
      </Routes>
    </BrowserRouter>
  );
}

export default App;