import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home/home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;