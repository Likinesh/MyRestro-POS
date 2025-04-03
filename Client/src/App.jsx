import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Orders from './pages/Orders'
import './index.css'
import Header from './components/Header'
import Tables from './pages/Tables';
import Menu from './pages/Menu';
import { useSelector } from 'react-redux';
import { useLoadData } from './hooks/useLoadData';
import Loader from './components/Loader';
import Dashboard from './pages/Dashboard';

function Protected({children}){
    const { isAdmin } = useSelector(state => state.user);
    if(!isAdmin){
      return <Navigate to='/auth' />
    }
    return children;
}

const App = () => {
  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeader = ['/auth'];
  const {isAdmin} = useSelector(state=>state.user);

  if(isLoading){
    return <Loader />
  }
  return (
    <>
        {!hideHeader.includes(location.pathname) && <Header />}
        <Routes>
          <Route path='/' element={<Protected><Home /></Protected>} />
          <Route path='/auth' element={isAdmin? <Navigate to='/' /> : <Auth />} />
          <Route path='/orders' element={<Protected><Orders /></Protected>} />
          <Route path='/tables' element={<Protected><Tables /></Protected>} />
          <Route path='/menu' element={<Protected><Menu /></Protected>} />
          <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
    </>
  )
}

export default App