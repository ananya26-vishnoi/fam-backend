import React from 'react'
import './Inbox.css'
import {Link, generatePath, useParams} from 'react-router-dom'
import {useDemoData} from '../../../composables/demo'

function Inbox() {
  const userData = useParams()
  const messages = useDemoData().inbox
  const users = useDemoData().users.slice(1)

  function handlePannel(e) {
    e.target.parentElement.parentElement.querySelectorAll(".toggled").forEach(element => {
      if (element.classList.contains("hidden")) {
        element.classList.remove("hidden")
        element.classList.add("shown")
      } else if (element.classList.contains("shown")) {
        element.classList.remove("shown")
        element.classList.add("hidden")
      }
    });
  }
  return (
  <div class="app-element Inbox_content content" >
    <section class="app-element pannel invisible-scrollbar" id="users">
      <button type="submit" class="app-element toggle" id="toggle-pannel-left"><i onClick={e=>handlePannel(e)} class="app-element bx bxs-right-arrow"></i></button>
      {users.map(user=>{return (
        <div class="app-element user" key={user.params.id} id={user.params.id}>
          <img alt='profilePicture-default' src="/profilePicture-default.png" class="app-element profile-picture default-profile-picture" />
          <p class="app-element toggled hidden name">{user.params.user.toLowerCase().replaceAll("_", " ")}</p>
          <div class="app-element user-activity" status="active"></div>
        </div>
      )})}
      
    </section>
    <section class="app-element center invisible-scrollbar">
      <div class="app-element links">
        <Link to={generatePath("/:user/:id/inbox",userData)} class="app-element link">
          <i class="app-element link bx bx-video"></i>
        </Link>
        <Link to={generatePath("/:user/:id/inbox",userData)} class="app-element link">
          <i class="app-element link bx bx-joystick"></i>
        </Link>
      </div>
      <div class="app-element" id="inbox">
      {messages.map(message=>{return (
        <article class="app-element message" key={message.at}>
          <header class="app-element info">
            <img alt='profilePicture-default' src="/profilePicture-default.png" class="app-element profile-picture default-profile-picture" />
            <p class="app-element author">{message.from.params.user.toLowerCase().replaceAll("_", " ")}</p>
            <p class="app-element time">{message.at}</p>
          </header>
          <p class="app-element message-content">{message.content}</p>
        </article>
      )})}
      </div>
    </section>
    <section class="app-element pannel invisible-scrollbar" id="selected-user">
      <button type="submit" class="app-element toggle" id="toggle-pannel-right"><i onClick={e=>handlePannel(e)} class="app-element bx bxs-left-arrow"></i></button>
      <div class="app-element toggled hidden user-info">
        <img src="/profilePicture-default.png" class="app-element profile-picture default-profile-picture toggled hidden" />
        <h2 class="app-element name  toggled hidden">{userData.user.toLowerCase().replaceAll("_", " ")}</h2>
        <p class="app-element people icon-text-wrapper toggled hidden">
          <i class="app-element bx bxs-group"></i>
          <span id="number">###</span>
        </p>
        <div class="app-element info toggled hidden">
          <p class="app-element birth info"><span class="app-element tag">Born:</span> DD.MM.YYYY</p>
          <p class="app-element location info"><span class="app-element tag">City:</span> Košice</p>
          <p class="app-element relationship-status info"><span class="app-element tag">Status:</span> Single</p>
        </div>
        <div class="app-element social toggled hidden">
          <a href="" class="app-element function">
            <i class="app-element bx bx-male-female"></i>
          </a>
          <Link to="{name: 'user-id-calendar', params: userData}" class="app-element link">
            <i class="app-element bx bx-calendar"></i>
          </Link>
          <a href="" class="app-element function">
            <i class="app-element bx bx-heart"></i>
          </a>
          <a href="" class="app-element function">
            <i class="app-element bx bx-share-alt"></i>
          </a>
        </div>
        <p class="app-element quote toggled hidden">We are memories for our loved ones.</p>
      </div>
    </section>
  </div>
  )
}

export default Inbox