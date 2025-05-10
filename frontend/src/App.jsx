import { Routes, Route } from 'react-router'
import Login from './Auth/Login'
import Register from './Auth/Signin'
import ForgotPassword from './Auth/ForgotPassword'
import Home from './Home'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard'
import LoadingSpinner from './Animation Loading/loadingSpinner'

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
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }/>
      <Route path='/percobaan' element={<LoadingSpinner Width={20} Height={2}/>}/>
    </Routes>
    </>
  )
}

export default App
