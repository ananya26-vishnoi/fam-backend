import React from 'react'
import './FAQ.css'
import { useFAQData } from '../composables/FAQ-data'

function FAQ() {
    const data = useFAQData();
  return (
    <div className="page-element content">
    <section className="page-element section faqlanding" id="landing">
      <header className="page-element speech dark-accent-text">
        <h1 className="page-element section-title">Frequently asked questions</h1>
        <p className="page-element section-subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime.</p>
      </header>
      <img className="page-element" src="/gathering.png" style={{filter: "hue-rotate(213deg) sepia(0.73) saturate(3) invert(0.22) brightness(1.3) contrast(1.1)"}} />
      <main className="page-element form questions main">
        <h2 className="page-element title dark-accent-text">You can tell us anything!</h2>
        <input className="page-element" type="email" placeholder="Email" title="Your email address goes here." id="message-email-input" />
        <input className="page-element" type="text" placeholder="Subject" title="Subject of your message goes here." id="message-subject-input" />
        <textarea className="page-element" rows="8" placeholder="Content" title="Content of your message goes here." id="message-content-input"></textarea>
        <button className="page-element button" type="submit" id="send-button">Send</button>
      </main>
    </section>
    <div className="page-element section-separator"></div>
    <section className="page-element list" id="faqs">
    {
        data.map((object)=>
            <button className="page-element question" key={object.id} id={object.id}>
                <h2 className="page-element subject">{object.subject}</h2>
                <p className="page-element description">{object.description}</p>
                <p className="page-element answer">{object.answer}</p>
            </button>
        )
    }
    </section>
  </div>
  )
}

export default FAQ