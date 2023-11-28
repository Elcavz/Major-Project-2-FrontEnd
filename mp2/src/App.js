import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './authentication.css';
import './App.css';
import Registration from './Authentication/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Registration/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;