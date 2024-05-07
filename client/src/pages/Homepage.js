import React from 'react'
import './Homepage.css'
import HomeNav from "../components/HomeNav"
import HomeFooter from "../components/HomeFooter"
import About from './About'
import Download from './Download'
import Index from './Index'
import { Route, Routes } from 'react-router-dom'
import FAQ from './FAQ'
import ForgotPassword from './ForgotPassword'
import Registration from './Registration'
import Login from './Login'


function Homepage() {
  return (
    <div>
    <HomeNav />
    <Routes>        
      <Route path="/"  element={<Index />} />
      <Route path="/download"  element={<Download />}/>
      <Route path="/about"  element={<About />}/>
      <Route path='/FAQ' element={<FAQ />} />
      <Route path='/password-recovery' element={<ForgotPassword />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    <HomeFooter />
    </div>
  )
}

export default Homepage