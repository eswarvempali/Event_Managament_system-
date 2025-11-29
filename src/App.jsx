import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import MyEvents from './pages/MyEvents'
import About from './pages/About'
import Admin from './pages/Admin'
import User from './pages/User'

export default function App(){
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/create" element={<CreateEvent/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/my-events" element={<MyEvents/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </div>
  )
}
