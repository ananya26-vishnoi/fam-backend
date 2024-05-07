import React from 'react'
import './Index.css'
import { Link, generatePath, useParams } from 'react-router-dom'


function Index() {
    const params = useParams();

  return (
    <div className="app-element Index_content content">
        <main className="app-element familytree">
        <div className="app-element member">
            <img alt='profilePicture-default' src="/profilePicture-default.png" className="app-element profile-picture default-profile-picture" />
            <p className="app-element name">Name Surname</p>
            <p className="app-element title">Grandpa</p>
            <p className="app-element birth info"><span className="app-element tag">Born:</span> DD.MM.YYYY</p>
            <p className="app-element location info"><span className="app-element tag">City:</span> Košice</p>
            <p className="app-element relationship-status info"><span className="app-element tag">Status:</span> Single</p>
        </div>
        </main>
        <nav className="app-element" id="sidebar">
        <Link to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link">
            <i className="app-element bx bxs-image"></i>
            <p className="app-element title">Photos</p>
        </Link>
        <Link to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link">
            <i className="app-element bx bxs-music"></i>
            <p className="app-element title">Audio</p>
        </Link>
        <Link to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link">
            <i className="app-element bx bxs-video"></i>
            <p className="app-element title">Video</p>
        </Link>
        <Link to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link">
            <i className="app-element bx bxs-book"></i>
            <p className="app-element title">Chronicle</p>
        </Link>
        <Link to={generatePath("/:user/:id",params)} className="app-element icon-text-wrapper link">
            <i className="app-element bx bxs-book-bookmark"></i>
            <p className="app-element title">Memorial</p>
        </Link>
        </nav>
    </div>
  )
}

export default Index