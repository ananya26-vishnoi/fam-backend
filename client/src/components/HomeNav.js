import React, { useState } from 'react'
import './HomeNav.css'


function HomeNav() {
  
  const [currentLanguage, setCurrentLanguage] = useState("EN")
  const [langList, setLangList] = useState(true)

  function handleDropdownElement(e) {
    setCurrentLanguage(e.target.classList[0])
    setLangList(true)
  }
  function handleDropdown(e) {
    if (langList) {
      setLangList(false)
    }else{
      setLangList(true)
    }
  }

  return (
    <header className="page-element" id="pageNavigation">
      <a className="page-element" id="home-link" href="/"><img src="/logo.png" className="page-element" alt="FamSketch" /></a>
      <nav className="page-element pages dark-accent-text">
        <a href="/download" className="page-element link">Download</a>
        <a href="/about" className="page-element link">About</a>
        <a href="/FAQ" className="page-element link">FAQ</a>
      </nav>
      <button onClick={handleDropdown} className="page-element dropdown" id="language">
        <h3 className="page-element selected">{currentLanguage}</h3>
        <div className={`page-element list ${(langList)? "hidden":""}`}>
          <li onClick={handleDropdownElement} language="English" className="EN language page-element">EN</li>
          <li onClick={handleDropdownElement} language="German" className="DE language page-element" >DE</li>
          <li onClick={handleDropdownElement} language="French" className="FR language page-element">FR</li>
          <li onClick={handleDropdownElement} language="Spanish" className="ES language page-element">ES</li>
          <li onClick={handleDropdownElement} language="Italian" className="IT language page-element">IT</li>
          <li onClick={handleDropdownElement} language="Arabic" className="AR language page-element">AR</li>
          <li onClick={handleDropdownElement} language="Chinese" className="ZH language page-element">ZH</li>
          <li onClick={handleDropdownElement} language="Hungarian" className="HU language page-element">HU</li>
          <li onClick={handleDropdownElement} language="Slovak" className="SK language page-element">SK</li>
          <li onClick={handleDropdownElement} language="Russian" className="RU language page-element">RU</li>
          <li onClick={handleDropdownElement} language="Polish" className="PL language page-element">PL</li>
        </div>
      </button>
    </header>
  )
}

export default HomeNav