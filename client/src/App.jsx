import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRouter from './components/AnimatedRouter'

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRouter />
    </Router>
  )
}

export default App
