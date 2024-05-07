import React, { useState } from 'react'
import './Login.css'
import {Link ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState(true)
  const [password, setPassword] = useState(true)
  const [form, setForm] = useState({email:"",password:""})

  const navigate = useNavigate()

  async function handleLoginForm(e) {
    const formData = {
      email: form.email,
      password: form.password
    }

    const endpointUrl = process.env.REACT_APP_BACKEND+'/user/login';

    axios.post(endpointUrl, formData)
      .then(function(response) {
        console.log('Request successful');
        const user = response.data.user
        setForm({email:"",password:""});
        navigate(`/${user.first_name}_${user.last_name}/${user.token_value}`)
      })
      .catch(function(error) {
        console.error('Request failed:', error.response.data);
        toast.error("Incorrect Email ID or Password")
      });

  }
  return (
    <div className="page-element content">
        <main className="page-element form login">
            <h2 className="page-element title dark-accent-text">Log in</h2>
            <input 
              type="email" 
              placeholder="Email" 
              title="Email address matching your account goes here." 
              id="login-email-input" 
              className={`page-element ${(email) ? '':'error'}`} 
              value={form.email}
              onChange={(e)=>{setForm({...form,email:e.target.value})}} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              title="Password matching your account goes here." 
              id="login-password-input" 
              className={`page-element ${(password) ? '':'error'}`} 
              value={form.password}
              onChange={(e)=>{setForm({...form,password:e.target.value})}} 
            />
            <button className="page-element button" type="submit" id="login-button" onClick={handleLoginForm}>Log in</button>
            <Link to="/password-recovery" className="page-element link" id="lost-password-link">Lost your password?</Link>
            <Link to="/registration" className="page-element link" id="create-account-link">Don't have an account yet?</Link>
        </main>
    </div>
  )
}

export default Login