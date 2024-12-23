import React from 'react';
import projects from '../projects.js'

function HomePage() {
    return (
      <div id="App">
        <header>
          <Header/>
        </header>
        <Body/>
      </div>
    );
  }

  function Body() {
    return <div id="body">
      <ProjectList/>
    </div>
  }

  function ProjectList() {
    return (
      <section>
      <h1>Projects</h1>
      <div id="projectList">
      {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
        </div>
      </section>
    )
  }
  
  function Project({project}) {
    return (
      <div class="project">
        <p id="date">{project.date}</p>
        <h3>{project.title}</h3>
          <a class="image-container" href={project.url}>
            <img src={project.thumbnail} alt={project.url}></img>
          </a>
        <p>{project.description}</p>
        <div className='languages'>
          {project.languages.map((language, index) => (
            <span key={index} className="language">{language}</span>
          ))}
        </div>
      </div>
      
    );  
  }

  function Header() {
    return <div id="Header">
      <h1>Sophie Stone</h1>
      <div id="icons">
      <a href="https://github.com/smstone0">    
      <img src="assets/github-mark/github-mark-white.svg" alt="GitHub" width="32.66" height= "32"></img>
      </a>
      <div id="icon-padding"></div>
      <a href="https://www.linkedin.com/in/sophie-stone-/">    
      <img src="/assets/In-White-96.png" alt="LinkedIn" width="32" height= "32"></img>
      </a>
      </div>
    </div>
  }

export default HomePage;