import React from 'react'
import './About.css'

function About() {
  return (
    <div class="page-element about_content content">
        <section class="page-element section right-main" id="landing">
            <header class="page-element speech bright-accent-text">
                <h1 class="page-element section-title">About us</h1>
                <h3 class="page-element section-subtitle">
                The main goal of our project is in short the creation of a web application, portal and mobile applications 
                based on a social network, for recording family information and sharing it between a narrow and precisely specified
                group of people - family members.
                </h3>
            </header>
            <img alt='colleagues' src="/colleagues.png" class="page-element" />
            <div class="page-element main"></div>
        </section>

        <section class="page-element" id="video-screen">
            <iframe class="page-element" title="FamSketch - Intro ENG version" src="https://youtu.be/FEE4mZOE5zQ" id="video-introduction"></iframe>
        </section>

        <section class="page-element" id="team">
            <h2 class="page-element section-title bright-accent-text"><center>Who is FamSketch?</center></h2>
            <div class="page-element people">
                <div class="page-element person" id="PeterLehotsky">
                    <img class="page-element" alt='Peter' src="/PeterLehotsky.png" />
                    <h2 class="page-element name">Peter Lehotský</h2>
                    <p class="page-element description">Author of the idea</p>
                    <p class="page-element specification">Linux | Unix specialist</p>
                    <a class="page-element link" href="https://www.linkedin.com/in/plehotsky" target="_blank">LinkedIn Account</a>
                </div>
                <div class="page-element person" id="LubosMincak">
                    <img class="page-element" alt='Lubos' src="/LubosMincak.png" />
                    <h2 class="page-element name">Ľuboš Minčák</h2>
                    <p class="page-element description">Software developer</p>
                    <p class="page-element specification">C++ | QT & QML Expert | Windows | Max | Linux</p>
                    <a class="page-element link" href="https://www.linkedin.com/in/lubos-mincak-iiteam/" target="_blank">LinkedIn Account</a>
                </div>
                <div class="page-element person" id="MarosMincak">
                    <img class="page-element" alt='Maros' src="/MarosMincak.png" />
                    <h2 class="page-element name">Maroš Minčák</h2>
                    <p class="page-element description">Backend Developer</p>
                    <p class="page-element specification">Laravel | PHP | DB | WEB</p>
                    <a class="page-element link" href="https://www.linkedin.com/in/maro%C5%A1-min%C4%8D%C3%A1k-0236a3187/" target="_blank">LinkedIn Account</a>
                </div>
                <div class="page-element person" id="MatejRecky">
                    <img class="page-element" alt='MatejRecky' src="/MatejRecky.png" />
                    <h2 class="page-element name">Matej Récky</h2>
                    <p class="page-element description">IT Enterprise Engineer</p>
                    <a class="page-element link" href="https://www.linkedin.com/in/matej-r%C3%A9cky-a0876613b/" target="_blank">LinkedIn Account</a>
                </div>
                <div class="page-element person" id="MatejKristan">
                    <img class="page-element" alt='MatejKristan' src="/MatejKristan.jpg" />
                    <h2 class="page-element name">Matej Kristan</h2>
                    <p class="page-element description">Fronend Web Developer</p>
                    <a class="page-element link" href="#">LinkedIn Account</a>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About