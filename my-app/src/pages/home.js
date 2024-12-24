import React from 'react';
import Projects from '../projects/Projects.js'

function Home() {
    return (
      <div id="Home">
        <header>
          <Header/>
        </header>
        <Body/>
      </div>
    );
  }

  function Body() {
    return <div id="Body">
      <Projects/>
    </div>
  }

  function Header() {
    return <div id="Header">
      <h1>Sophie Stone</h1>
      <div id="icons">
      <a href="https://github.com/smstone0">    
      <img src="assets/github/github-mark-white.svg" alt="GitHub" width="32.66" height= "32"></img>
      </a>
      <div id="icon-padding"></div>
      <a href="https://www.linkedin.com/in/sophie-stone-/">    
      <img src="/assets/In-White-96.png" alt="LinkedIn" width="32" height= "32"></img>
      </a>
      </div>
    </div>
  }

export default Home;