import React, { useState } from 'react'
import './Registration.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

function Registration() {
  const [name, setName] = useState(true)
  const [surname, setSurname] = useState(true)
  const [email, setEmail] = useState(true)
  const [password, setPassword] = useState(true)
  const [repeatPassword, setRepeatPassword] = useState(true)
  const [form, setForm] = useState({ name: "", surname: "", email: "", password: "", repeatPassword: ""})

  const navigate = useNavigate()

  function checkInput(e, inputContent, inputControl, conditions=false) {
    if (!inputContent.trim() || conditions) {
      inputControl(false);
      return false;
    }
      inputControl(true);
    return true;
  }

  async function handleForm(e) {
    checkInput(e, form.name, setName, !/^[a-z]+$/i.test(form.name.trim()))
    checkInput(e, form.surname, setSurname, !/^[a-z]+$/i.test(form.surname.trim()))
    checkInput(e, form.email, setEmail, !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.trim()))
    checkInput(e, form.password, setPassword)
    checkInput(e, form.repeatPassword, setRepeatPassword)
    if (!name || !surname || !email || !password || !repeatPassword){
      setForm({ name: "", surname: "", email: "", password: "", repeatPassword: ""});
      toast.warn("Invalid inputs")
      return
    }
    const formData = {
      first_name: form.name,
      last_name: form.surname,
      email: form.email,
      password: form.password,
      repeat_password: form.repeatPassword
    }

    // Define the endpoint URL where you want to send the FormData
    const endpointUrl = process.env.REACT_APP_BACKEND+'/user/register';

    // Make a POST request using Axios
    axios.post(endpointUrl, formData)
      .then(function(response) {
        // Request was successful, handle the response
        console.log('Request successful');
        console.log(response.data);
        toast.success("Registered Successfully")
        const email = form.email
        // Clear the form after successful submission
        setForm({ name: "", surname: "", email: "", password: "", repeatPassword: ""})
        navigate(`/otp/${email}`)
      })
      .catch(function(error) {
        // Request failed, handle the error
        console.error('Request failed:', error);
        toast.error(error.response.data.error)
      });

  }

  return (
    <div className="page-element reg-content content">
    <main className="page-element form registration">
      <h2 className="page-element title bright-accent-text">Registration</h2>
      <input type="text" placeholder="Name" title="Your name goes here." id="registration-name-input" className={`page-element ${(name) ? '':'error'}`} 
        value={form.name}
        onChange={(e)=>{setForm({...form,name:e.target.value})}} 
      />
      <input type="text" placeholder="Surname" title="Your surname goes here." id="registration-surname-input" className={`page-element ${(surname) ? '':'error'}`} 
        value={form.surname}
        onChange={(e)=>{setForm({...form,surname:e.target.value})}} 

      />
      <input type="email" placeholder="Email" title="Your email address goes here." id="registration-email-input" className={`page-element ${(email) ? '':'error'}`} 
        value={form.email}
        onChange={(e)=>{setForm({...form,email:e.target.value})}} 
      />
      <input type="password" placeholder="Password" title="Your new password goes here." id="registration-password-input" className={`page-element ${(password) ? '':'error'}`} 
        value={form.password}
        onChange={(e)=>{setForm({...form,password:e.target.value})}} 
      />
      <input type="password" placeholder="Repeat Password" title="Insert your new password again here." id="registration-repeat-password-input" className={`page-element ${(repeatPassword) ? '':'error'}`} 
        value={form.repeatPassword}
        onChange={(e)=>{setForm({...form,repeatPassword:e.target.value})}} 
      />
      <button className="page-element button" type="submit" id="register-button" onClick={handleForm}>Register at FamSketch</button>
      <Link to="/#Terms&Conditions" className="page-element link" id="terms-conditions-link">Terms & Conditions</Link>
      <Link to="/#PrivacyPolicy" className="page-element link" id="privacy-policy-link">Privacy policy</Link>
    </main>
  </div>
  )
}

export default Registration