import React from 'react'
import './Dashboard.css'
import AppNav from '../../../components/AppNav.js'
import Index from './Index.js';
import Profile from './Profile';
import Calendar from './Calendar';
import Inbox from './Inbox'
import { Route, Routes } from 'react-router-dom';



function Dashboard() {
    // const params = useDemoData().userData.params
    
    // console.log(p);
  return (
    <div className='dashboard'>
        <AppNav />
        <Routes>        
          <Route path="/"  element={<Index />}/>
          <Route path="/profile"  element={<Profile />}/>
          <Route path="/calender"  element={<Calendar />}/>
          <Route path='/inbox' element={<Inbox />} />
        </Routes>
    </div>
    
  )
}

export default Dashboard