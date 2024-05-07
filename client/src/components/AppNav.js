import React from 'react'
import './AppNav.css'
import { Link, generatePath, useParams } from 'react-router-dom'

function AppNav() {
  const params = useParams()
  const handleDropdown = (e)=>{
    let list = e.target.parentElement.querySelector(".list")
    if (list.classList.contains("hidden")) {
      list.classList.remove("hidden")
    }else{
      list.classList.add("hidden")
    }
  }
  const handleDropdownElement = (e)=>{
    e.target.parentElement.classList.add("hidden")
  }
  const handleDropdownElementGlitch = (e)=>{
    e.target.parentElement.click()
  }
  const handleHamburger = (e)=>{
    let menu = e.target.parentElement.querySelector(".menu")
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden")
    }else{
      menu.classList.add("hidden")
    }
  }
  const handleHamburgerElement = (e)=>{
    e.target.parentElement.classList.add("hidden")
  }
  const handleHamburgerElementGlitch = (e)=>{
    e.target.parentElement.click()
  }


  return (
    // <header id='appNavigation'>NAVBAR</header>
    <header className="app-element" id="appNavigation">
    <Link to={generatePath("/:user/:id/profile",params)} id="profile-link"><img src="/logo.png" className="app-element" alt="FamSketch" /></Link>
    <div className="app-element search">
      <input className="app-element" type="text" placeholder="Search" id="search-input" />
      <button className="app-element" id="search-button"><i className="app-element bx bx-search"></i></button>
    </div>
    <button className="app-element" id="search-link"><i className="app-element bx bx-search"></i></button>
    <nav className="app-element navigation">
      <Link to={generatePath("/:user/:id",params)} className="app-element link" id="home-link">
        <i className="app-element bx bxs-home"></i>
      </Link>
      <Link to={generatePath("/:user/:id/inbox",params)} className="app-element link" id="inbox-link">
        <i className="app-element bx bxs-envelope"></i>
      </Link>
      <Link to={generatePath("/:user/:id/calender",params)} className="app-element link" id="calendar-link">
        <i className="app-element bx bx-calendar"></i>
      </Link>
      <Link to={generatePath("/:user/:id",params)} className="app-element link" id="hierarchy-link">
        <i className="app-element bx bx-sitemap"></i>
      </Link>
    </nav>
    <div className="app-element user">
      <div className="app-element user-activity" status="active" id="user-activity"></div>
      <Link to={generatePath("/:user/:id/profile",params)} className="app-element" id="img-profile-link"><img src="/profilePicture-default.png" className="app-element profile-picture default-profile-picture" alt="userData.user.toLowerCase().replaceAll('_', ' ')" id="profile-picture"/></Link>
      <button className="app-element dropdown">
        <i onClick={e=>handleDropdown(e)} className="app-element bx bxs-down-arrow"></i>
        <div className="app-element list hidden">
          <Link onClick={e=>handleDropdownElement(e)} className="app-element icon-text-wrapper link element">
            <i onClick={e=>handleDropdownElementGlitch(e)} className="app-element bx bxs-video"></i>
            <p onClick={e=>handleDropdownElementGlitch(e)} className="app-element title">Online room</p>
          </Link>
          <Link onClick={e=>handleDropdownElement(e)} className="app-element icon-text-wrapper link element">
            <i onClick={e=>handleDropdownElementGlitch(e)} className="app-element bx bxs-image"></i>
            <p onClick={e=>handleDropdownElementGlitch(e)} className="app-element title">Album</p>
          </Link>
          <Link onClick={e=>handleDropdownElement(e)} className="app-element icon-text-wrapper link element">
            <i onClick={e=>handleDropdownElementGlitch(e)} className="app-element bx bxs-book"></i>
            <p onClick={e=>handleDropdownElementGlitch(e)} className="app-element title">Chronicle</p>
          </Link>
          <Link onClick={e=>handleDropdownElement(e)} className="app-element icon-text-wrapper link element">
            <i onClick={e=>handleDropdownElementGlitch(e)} className="app-element bx bxs-book-bookmark"></i>
            <p onClick={e=>handleDropdownElementGlitch(e)} className="app-element title">Memorial</p>
          </Link>
          <Link onClick={e=>handleDropdownElement(e)} className="app-element icon-text-wrapper link element">
            <i onClick={e=>handleDropdownElementGlitch(e)} className="app-element bx bxs-cog"></i>
            <p onClick={e=>handleDropdownElementGlitch(e)} className="app-element title">Settings</p>
          </Link>
          <Link to="/" onClick={e=>handleDropdownElement(e)} className="app-element icon-text-wrapper link element">
            <i onClick={e=>handleDropdownElementGlitch(e)} className="app-element bx bxs-log-out"></i>
            <p onClick={e=>handleDropdownElementGlitch(e)} className="app-element title">Log out</p>
          </Link>
        </div>
      </button>
    </div>
    <div className="app-element hamburger-menu">
      <i onClick={e=>handleHamburger(e)} className="app-element bx bx-menu"></i>
      <div className="app-element menu hidden">
        <button onClick={e=>handleHamburgerElement(e)} type="submit" className="app-element close-button">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bx-x"></i>
        </button>
        <Link onClick={e=>handleHamburgerElement(e)} to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link element user">
          <img onClick={e=>handleHamburgerElementGlitch(e)} alt='profilePicture-default' src="/profilePicture-default.png" className="app-element profile-picture default-profile-picture" id="profile-picture" />
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title name">{params.user.toLowerCase().replaceAll('_', ' ')}</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bxs-video"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Online room</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bx-sitemap"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Family tree</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bxs-image"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Album</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bxs-book"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Chronicle</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bxs-book-bookmark"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Memorial</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bxs-cog"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Settings</p>
        </Link>
        <Link onClick={e=>handleHamburgerElement(e)} to="/" className="app-element icon-text-wrapper link element">
          <i onClick={e=>handleHamburgerElementGlitch(e)} className="app-element bx bxs-log-out"></i>
          <p onClick={e=>handleHamburgerElementGlitch(e)} className="app-element title">Log out</p>
        </Link>
      </div>
    </div>
  </header>
  )
}

export default AppNav