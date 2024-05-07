// import logo from './logo.svg';
import Homepage from './pages/Homepage';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/user/id/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTP from './pages/OTP';


function App() {
  return (
    <div className='application'>
      <Routes>
        <Route path='*' element={<Homepage />} exact/>
        <Route path='/:user/:id/*' element={<Dashboard />} exact/>
        <Route path='/otp/:email' element={<OTP />} exact />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose='5000'
        stacked
        pauseOnHover
        draggable
        style={{textTransform:'capitalize'}}
      />
    </div>
  );
}

export default App;
