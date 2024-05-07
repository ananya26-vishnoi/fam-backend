import React from 'react'
import './Download.css'

function Download() {
  return (
    <div className="page-element content">
        <section className="page-element section right-main" id="landing">
            <header className="page-element speech dark-accent-text">
                <h1 className="page-element section-title">Download</h1>
                <h3 className="page-element section-subtitle">
                Starting using our application on any of your devices right away.
                </h3>
            </header>
            <img alt="family" src="/family.png" className="page-element" />
            <div className="page-element main options">
                <div className="page-element option" id="android-brief">
                    <h2 className="page-element option-title dark-accent-text">Android</h2>
                    <div className="page-element buttons">
                        <a href="/" target="_blank" className="page-element download-link link button">Download</a>
                        <a href="#Android" className="page-element more-link link button">Learn more</a>
                    </div>
                </div>
                <div className="page-element option" id="ios-brief">
                    <h2 className="page-element option-title dark-accent-text">iOS</h2>
                    <div className="page-element buttons">
                        <a href="/" target="_blank" className="page-element download-link link button">Download</a>
                        <a href="#iOS" className="page-element more-link link button">Learn more</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Download