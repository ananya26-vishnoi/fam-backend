import React from 'react'
import './HomeFooter.css'
import {useDemoData} from '../composables/demo'

function HomeFooter() {
  const data = useDemoData()
  return (
    <footer className="page-element" id="pageInformations">
      <div className="page-element pages container">
        <h2 className="page-element container-title">FamSketch</h2>
        <a href="/about" className="page-element link">About</a>
        <a href="/#How-it-works" className="page-element link">How it works</a>
        <a href="/FAQ" className="page-element link">FAQ</a>
        <a href="/" className="page-element link">Blog</a>
        <a href={`/${data.userData.params.user}/${data.userData.params.id}`} target="_blank" rel="noreferrer" className="page-element link">
          Demo Account
        </a>
      </div>
      <div className="page-element download container">
        <h2 className="page-element container-title">Download</h2>
        <a href="/download#Android" className="page-element link">Android</a>
        <a href="/download#iOS" className="page-element link">iOS</a>
      </div>
      <div className="page-element company container">
        <h2 className="page-element container-title">Company</h2>
        <a href="/about" className="page-element link">About</a>
        <a href="/#careers" className="page-element link">Careers</a>
        <a href="/#Terms&Conditions" className="page-element link">Terms & Conditions</a>
        <a href="/#PrivacyPolicy" className="page-element link">Privacy policy</a>
        <a href="/#PrivacyPolicy" className="page-element link">Ads policy</a>
      </div>
      <div className="page-element socials container">
        <a href="/" className="page-element social link" target="_blank" id="facebook-link">
          <i className="page-element bx bxl-facebook"></i>
        </a>
        <a href="/" className="page-element social link" target="_blank" id="twitter-link">
          <i className="page-element bx bxl-twitter"></i>
        </a>
        <a href="/" className="page-element social link" target="_blank" id="linkedin-link">
          <i className="page-element bx bxl-linkedin"></i>
        </a>
        <a href="/" className="page-element social link" target="_blank" id="instagram-link">
          <i className="page-element bx bxl-instagram-alt"></i>
        </a>
      </div>
      <p className="page-element watermark">© 2023 FamSketch</p>
    </footer>
  )
}

export default HomeFooter