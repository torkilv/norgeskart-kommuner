import './App.css';
import projects from './projects.js';

function Header() {
  return <div id="Header">
    <h1>Sophie Stone</h1>
    <div id="icons">
    <a href="https://github.com/smstone0">    
      <img src="github-mark/github-mark-white.svg" alt="GitHub" width="32.66" height= "32"></img>
    </a>
    <div id="icon-padding"></div>
    <a href="https://www.linkedin.com/in/sophie-stone-/">    
      <img src="/In-White-96.png" alt="LinkedIn" width="32" height= "32"></img>
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
      <a href={project.url}>
        <div className="image-container">
          <img src={project.thumbnail} alt={project.url}></img>
        </div>
      </a>
      <p>{project.description}</p>
    </div>
  );  
}

function App() {
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
