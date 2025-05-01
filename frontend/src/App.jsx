import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Login from './Auth/Login'
import Register from './Auth/Signin'
import ForgotPassword from './Auth/ForgotPassword'
import Home from './Home'
import PrivateRoute from './PrivateRoute'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/' element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      }/>
    </Routes>
    </>
  )
}

export default App
