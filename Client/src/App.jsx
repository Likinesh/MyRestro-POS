import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Orders from './pages/Orders'
import './index.css'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </Router>
    </>
  )
}

export default App