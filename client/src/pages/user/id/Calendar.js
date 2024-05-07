import React, { useState } from 'react'
import './Calendar.css'
import CalendarCard from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';

function Calendar() {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const hrs = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","23","24"];
  const [date, setDate] = useState(new Date())

  var dateOffset = (24*60*60*1000)

  const nextDate= ()=>{
    setDate(new Date(date.getTime() + dateOffset));
  }
  const previousDate= ()=>{
    setDate(new Date(date.getTime() - dateOffset));
  }
  return (
    <div className='app-element content calendar-content'>
      <section className='app-element calendar'>
        <div className='calendar-card'>
          <button className='newevent'>
            <div className='addbutton'>+</div>
            <div className='addbutton_text'>New Event</div>
          </button>
          <CalendarCard
            value={date}
            onChange={setDate}
            // onClickDay={()=>{console.log(date)}}
          />
          <button className='app-element dropdown calendar-name'><i className='bx bxs-down-arrow'></i> My Calendar</button>
        </div>
      </section>
      <section className='app-element schedule'>
        <div className='schedule-button'>
          <button>Schedule</button>
        </div>
        <div className='schedule-card'>
          <div className='date'>
            <button onClick={previousDate}>{"<"}</button>
              {`${dayNames[new Date(date).getDay()]}, ${new Date(date).getDate()}, ${month[new Date(date).getMonth()]}, ${new Date(date).getFullYear()}`}
            <button onClick={nextDate}>{">"}</button>
          </div>
          <div className='time-period invisible-scrollbar'>
            {hrs.map((hr)=>{
              return (<div className='hr-card' key={hr}>
                <div className='one-hr'>{`${hr}:00`}</div>
                <div className='daily-plan'>
                  <div className='first'></div>
                  <div className='second'></div>
                </div>
              </div>);
            })}
          </div>
        </div>
      </section>
      <section className='app-element plan'>
          <div className='app-element plan-event'>
            <img className='plan-image' alt='event-image' src='/ad-1.png'/>
            <div className='app-element plan-details'>
              <p className='app-element plan-title'>Wedding Ivana and Lukas</p>
              <p className="app-element icon-text-wrapper">
                <i className="app-element bx bx-time-five"></i>
                <span id="details">Since 10:00</span>
              </p>
              <p className="app-element icon-text-wrapper">
                <i className="app-element bx bx-calendar"></i>
                <span id="details">{`${dayNames[new Date(date).getDay()]}, ${new Date(date).getDate()}, ${month[new Date(date).getMonth()]}, ${new Date(date).getFullYear()}`}</span>
              </p>
              <p className="app-element icon-text-wrapper">
                <i className="app-element bx bxs-calendar-check"></i>
                <span id="details">Participation confirmed</span>
              </p>
              <p className='app-element participants-title'>Participants</p>
              <div className='app-element participants'>
                <img className='participant' src='/profilePicture-default.png' alt='profilePicture-default'/>
                <img className='participant' src='/profilePicture-default.png' alt='profilePicture-default'/>
                <img className='participant' src='/profilePicture-default.png' alt='profilePicture-default'/>
                <img className='participant' src='/profilePicture-default.png' alt='profilePicture-default'/>
              </div>
              <input type="text" className="app-element plan-note" id="content" placeholder="Add notes" />

            </div>
          </div>
      </section>
    </div>
  )
}

export default Calendar