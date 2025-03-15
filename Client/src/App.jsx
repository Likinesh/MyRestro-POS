import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Orders from './pages/Orders'
import './index.css'
import Header from './components/Header'
import Tables from './pages/Tables';
import Menu from './pages/Menu';

const App = () => {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/tables' element={<Tables />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
    </>
  )
}

export default App