import React, { useState } from 'react';
import './OTP.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


function OTP() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const email = useParams().email;

  // Function to handle OTP submission
  async function handleOTPSubmit() {
    // Validate OTP format (for example, should be a 6-digit number)
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      toast.warn('Invalid OTP format');
      return;
    }

    // Send OTP for verification
    const formData = {
      email: email,
      otp: otp
    };

    // Define the endpoint URL for OTP verification
    const endpointUrl = process.env.REACT_APP_BACKEND+'/user/verify';

    // Make a POST request using Axios
    try {
      const response = await axios.post(endpointUrl, formData);
      // Handle successful verification
      console.log('OTP Verified:', response.data);
      const user = response.data.user
      navigate(`/${user.first_name}_${user.last_name}/${user.token_value}`)
      // Redirect user to the next page or perform other actions
    } catch (error) {
      // Handle verification failure
      console.error('OTP Verification failed:', error);
      toast.error('OTP verification failed')
    }
  }

  return (
    <div className='page-element content'>
      <section className='page-element section right-main otp'>
        <header className="page-element dark-accent-text otp-header">
            <h1 className="page-element section-title">Verify your Email</h1>
            <p className="page-element section-subtitle">Verify your email address to connect with your family!</p>
        </header>
        <img alt='colleagues' src='/colleagues.png' className='page-element'/>
        <main className="page-element form main otp-container">
          <h2 className="page-element title dark-accent-text">Please enter the OTP sent to {email}</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className='page-element'
          />
          <button onClick={handleOTPSubmit} className='page-element button'>Verify</button>
        </main>
      </section>
    </div>
  );
}

export default OTP;
