import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/SignUp';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='*' element={<p>Page not found</p>}/>
    </Routes>
  )
}

export default App
