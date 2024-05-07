import React, { useState } from 'react'

import './Index.css'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';

function Index() {
    const [login_email, setLogin_email] = useState(true)
    const [login_password, setLogin_password] = useState(true)
    const [login_mistake, setLogin_mistake] = useState(false)
    const [login, setLogin] = useState({email: "", password: ""})
    const [login_address, setLogin_address] = useState("/")

    const [registration_name, setRegistration_name] = useState(true)
    const [registration_surname, setRegistration_surname] = useState(true)
    const [registration_email, setRegistration_email] = useState(true)
    const [registration_password, setRegistration_password] = useState(true)
    const [registration_repeatPassword, setRegistration_repeatPassword] = useState(true)

    const [registration, setRegistration] = useState({ name: "", surname: "", email: "", password: "", repeatPassword: ""})

    const navigate = useNavigate()

    function checkInput(e, inputContent, inputControl, conditions=false) {
        if (!inputContent.trim() || conditions) {
        inputControl(false);
        return false;
        }
        inputControl(true);
        return true;
    }
    const handleLogin = (e)=>{
        if(!login.email.includes('@')){
            toast.warn("Invalid Email ID")
            return
        }
        const formData = {
            email: login.email,
            password: login.password    
        }
        const endpointUrl = process.env.REACT_APP_BACKEND+'/user/login';

        axios.post(endpointUrl, formData)
        .then(function(response) {
            console.log('Request successful');
            const user = response.data.user
            setLogin({email: "", password: ""})
            navigate(`/${user.first_name}_${user.last_name}/${user.token_value}`)
        })
        .catch(function(error) {
            // Request failed, handle the error
            const error_msg = error.response.data.error
            console.error('Request failed:', error);
            toast.error(error_msg)
        });

    }
    const handleRegistration = (e)=>{
        checkInput(e, registration.name, setRegistration_name, !/^[a-z]+$/i.test(registration.name.trim()))
        checkInput(e, registration.surname, setRegistration_surname, !/^[a-z]+$/i.test(registration.surname.trim()))
        checkInput(e, registration.email, setRegistration_email, !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registration.email.trim()))
        checkInput(e, registration.password, setRegistration_password)
        checkInput(e, registration.repeatPassword, setRegistration_repeatPassword)
        if (!registration_name || !registration_surname || !registration_email || !registration_password || !registration_repeatPassword) 
            setRegistration({ name: "", surname: "", email: "", password: "", repeatPassword: "" })
        
        const formData = {
            first_name: registration.name,
            last_name: registration.surname,
            email: registration.email,
            password: registration.password,
            repeat_password: registration.repeatPassword
        }
        
        const endpointUrl = process.env.REACT_APP_BACKEND+'/user/register';
        
        axios.post(endpointUrl, formData)
        .then(function(response) {
            // Request was successful, handle the response
            console.log('Request successful');
            console.log(response.data);
            toast.success("Registered Successfully")
            // Clear the form after successful submission
            const email = registration.email
            setRegistration({ name: "", surname: "", email: "", password: "", repeatPassword: ""})
            navigate(`/otp/${email}`)
        })
        .catch(function(error) {
            // Request failed, handle the error
            console.error('Request failed:', error);
            toast.error("Error during registration")
        });
    
    }
  return (
    <div className="page-element home_content content">
        <section className="page-element section right-main" id="landing">
        <header className="page-element speech dark-accent-text">
            <h1 className="page-element section-title">We are memories for our loved ones.</h1>
            <p className="page-element section-subtitle">Connect with your family, share your experiences and create a family tree in a simple and clear way!</p>
        </header>
        <img alt="family" src="/family.png" className="page-element" />
        <main className="page-element form login main">
            <h2 className="page-element title dark-accent-text">Log in</h2>
            <input type="email" placeholder="Email" title="Email address matching your account goes here." id="login-email-input" className={`page-element ${(login_email) ? '':'error'}`} 
            value={login.email}
            onChange={(e)=>setLogin({...login,email:e.target.value})} />
            <input type="password" placeholder="Password" title="Password matching your account goes here." id="login-password-input" className={`page-element ${(login_password) ? '':'error'}`} 
            value={login.password}
            onChange={(e)=>setLogin({...login,password:e.target.value})} />
            <button className="page-element button" type="submit" id="login-button" onClick={handleLogin}>Log in</button>
            <p className={`page-element alert ${login_mistake ? 'mistake' : ''}`}>Email or Password provided was incorrect.</p>
            <Link to={login_address} className="page-element link"  id="login-address" hidden>Login</Link>
            <Link to="/password-recovery" className="page-element link" id="lost-password-link">Lost your password?</Link>
            <Link to="/registration" className="page-element link" id="create-account-link">Don't have an account yet?</Link>
        </main>
        </section>

        <section className="page-element" id="about">
            <div className="page-element speech">
                <h1 className="page-element section-title bright-accent-text">About us</h1>
                <h3 className="page-element section-subtitle">
                The main goal of our project is in short the creation of a web application, portal and mobile applications 
                based on a social network, for recording family information and sharing it between a narrow and precisely specified
                group of people - family members.
                </h3>
            </div>
            <Link className="page-element button" to="/about">Read more</Link>
            <iframe className="page-element" title="FamSketch - Intro ENG version" src="https://www.youtube.com/FEE4mZOE5zQ" id="video-introduction"></iframe>
        </section>

        <section className="page-element section right-main" id="How-it-works">
            <header className="page-element speech dark-accent-text">
                <h1 className="page-element section-title">We are memories for our loved ones.</h1>
                <p className="page-element section-subtitle">Connect with your family, share your experiences and create a family tree in a simple and clear way!</p>
            </header>
            <img alt="family" src="/family.png" className="page-element" />
            <div className="page-element features main">
                <h2 className="page-element section-title bright-accent-text">What do we offer?</h2>
                <ul className="page-element list">
                <li className="page-element feature">store and share photos, audio and video</li>
                <li className="page-element feature">standard social network features</li>
                <li className="page-element feature">clear and simple faimily tree</li>
                <li className="page-element feature">connect not only with the family, but also with family acquaintances</li>
                <li className="page-element feature">creating an online family chronicle</li>
                </ul>
            </div>
        </section>

        <section className="page-element section left-main" id="faq">
            <div className="page-element form questions main">
                <h2 className="page-element title bright-accent-text">Send us your message!</h2>
                <input className="page-element" type="email" placeholder="Email" id="message-email-input" />
                <input className="page-element" type="text" placeholder="Subject" id="message-subject-input" />
                <textarea className="page-element" rows="8" placeholder="Content" id="message-content-input"></textarea>
                <button className="page-element button" type="submit" id="send-button">Send</button>
            </div>
            <header className="page-element speech bright-accent-text">
                <h1 className="page-element section-title">You can tell us anything!</h1>
                <p className="page-element section-subtitle">Here's a <Link to="/FAQ" className="page-element bright-accent-text link">list of frequently asked questions</Link>.</p>
            </header>
            <img alt='gathering' src="/gathering.png" className="page-element" style={{filter: "hue-rotate(213deg) sepia(0.73) saturate(3) invert(0.22) brightness(1.3) contrast(1.1)"}} />
        </section>

        <section className="page-element section right-main" id="registration">
            <header className="page-element speech bright-accent-text">
                <h1 className="page-element section-title">Do you want to create an account?</h1>
                <p className="page-element section-subtitle">Connect with your family, share your experiences and create a family tree in a simple and clear way!</p>
            </header>
            <img alt="welcoming" src="/welcoming.png" className="page-element" />
            <div className="page-element form registration main">
                <h2 className="page-element title bright-accent-text">Registration</h2>
                <input type="text" placeholder="Name" title="Your name goes here." id="registration-name-input" className={`page-element ${(registration_name) ? '':'error'}`} 
                value={registration.name}
                onChange={e=>setRegistration({...registration,name:e.target.value})} />
                <input type="text" placeholder="Surname" title="Your surname goes here." id="registration-surname-input" className={`page-element ${(registration_surname) ? '':'error'}`} 
                value={registration.surname}
                onChange={e=>setRegistration({...registration,surname:e.target.value})} />
                <input type="email" placeholder="Email" title="Your email address goes here." id="registration-email-input" className={`page-element ${(registration_email) ? '':'error'}`} 
                value={registration.email}
                onChange={e=>setRegistration({...registration,email:e.target.value})} />
                <input type="password" placeholder="Password" title="Your new password goes here." id="registration-password-input" className={`page-element ${(registration_password) ? '':'error'}`} 
                value={registration.password}
                onChange={e=>setRegistration({...registration,password:e.target.value})} />
                <input type="password" placeholder="Repeat Password" title="Insert your new password again here." id="registration-repeat-password-input" className={`page-element ${(registration_repeatPassword) ? '':'error'}`} 
                value={registration.repeatPassword}
                onChange={e=>setRegistration({...registration,repeatPassword:e.target.value})} />
                <button className="page-element button" type="submit" id="register-button" onClick={handleRegistration}>Register at FamSketch</button>
                <Link to="/Terms&Conditions" className="page-element link" id="terms-conditions-link">Terms & Conditions</Link>
                <Link to="/PrivacyPolicy" className="page-element link" id="privacy-policy-link">Privacy policy</Link>
            </div>
        </section>
    </div>
  )
}

export default Index