import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import projects from './projects.js';
import Map_UK from './uk-map/map.js';

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

function Body() {
  return <div id="body">
    <ProjectList></ProjectList>
  </div>
}

function ProjectList() {
  return (
    <section>
    <h1>Projects</h1>
    <div id="projectList">
    {projects.map(project => (
        <Project key={project.id} project={project} />
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
        <div className="image-container">
          {/* figma/flutter etc buttons to indicate tech used for each project */}
          <a className="image-container" href={project.url}>
            <img src={project.thumbnail} alt={project.url}></img>
          </a>
        </div>
      <p>{project.description}</p>
    </div>
  );  
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/uk-map" element={<Map_UK/>} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div id="App">
      <header>
        <Header></Header>
      </header>
      <Body></Body>
    </div>
  );
}

export default App;
