import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/homePage'
import Login from './pages/login/login'
import { Toaster } from 'react-hot-toast'
import AdminPage from './pages/admin/adminPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import VerifyEmail from './verify email/verifyEmail'
import RegisterPage from './register/registerPage'

function App() {

  return (
    <GoogleOAuthProvider clientId="800527354614-p0q6hjq6c89a00cjk8hhe5vs95lpivf5.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position='top-right'/>
          <Routes path="/*">
            <Route path="/admin/*" element={<AdminPage/>}/>
            <Route path="/*" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/verify-email" element={<VerifyEmail/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
          
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
