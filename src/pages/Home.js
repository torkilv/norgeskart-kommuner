import React from 'react';
import Projects from '../components/Projects.js'
import Header from '../components/Header.js';

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