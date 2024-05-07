import React, { useState } from 'react'
import './ForgotPassword.css'

function ForgotPassword() {
  const [name, setName] = useState(true)
  const [surname, setSurname] = useState(true)
  const [email, setEmail] = useState(true)
  const [form, setForm] = useState({name: "", surname: "", email: ""})

  function checkInput(e, inputContent, inputControl, conditions=false) {
    if (!inputContent.trim() || conditions) {
      inputControl(false);
      return false;
    }
    inputControl(true);
    return true;
  }

  function handleForm(e) {
    checkInput(e, form.name, name, !/^[a-z]+$/i.test(form.name.trim()))
    checkInput(e, form.surname, surname, !/^[a-z]+$/i.test(form.surname.trim()))
    checkInput(e, form.email, email, !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.trim()))
    if (name && surname && email) 
      setForm({ name: "", surname: "", email: ""});
  }

  return (
    <div className="page-element pwdrecovery-content content">
      <main className="page-element form password-recovery">
        <h2 className="page-element title">Lost your password?</h2>
        <input type="text" placeholder="Name" title="Name matching your account goes here." id="name-input" className={(name) ? 'page-element':'page-element error'}
          value={form.name}
          onChange={(e)=>{setForm({...form,name:e.target.value})}}
        />
        <input type="text" placeholder="Surname" title="Surname matching your account goes here." id="surname-input" className={(surname) ? 'page-element':'page-element error'}
          value={form.surname}
          onChange={(e)=>{setForm({...form,surname:e.target.value})}}
        />
        <input type="email" placeholder="Email" title="Email address matching your account goes here." id="email-input" className={(email) ? 'page-element':'page-element error'}
          value={form.email}
          onChange={(e)=>{setForm({...form,email:e.target.value})}}
        />
        <button className="page-element button" type="submit" id="recover-password-button" onClick={handleForm}>Send</button>
      </main>
    </div>
  )
}

export default ForgotPassword