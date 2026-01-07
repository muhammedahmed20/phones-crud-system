import React from 'react'
import Signin from './components/Signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

export default function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
