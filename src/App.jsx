import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/SignUp';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App
