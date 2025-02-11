import React from 'react';
import Projects from '../components/projects/Projects.js'
import Header from '../components/header/Header.js';

function Home() {
    return (
      <div id="Home">
        <div id="Content">
          <header>
            <Header/>
          </header>
          <Projects/>
        </div>
      </div>
    );
  }

export default Home;