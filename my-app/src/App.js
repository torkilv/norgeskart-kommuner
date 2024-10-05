import './App.css';
import projects from './projects.js';

function Intro() {
  return <div className="Intro">
    <h2>Sophie Stone</h2>
    {/* Sites */}
  </div>
}

function Body() {
  return <div className="body">
    <ProjectList></ProjectList>
  </div>
}

function ProjectList() {
  return (
    <section>
    <h1>Projects</h1>
    {projects.map(project => (
        <Project key={project.id} project={project} />
      ))}
    </section>
  )
}

function Project({project}) {
  return (
    // set colour
    <div class="project">
      <a href={project.url}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </a>
    </div>
  );  
}

function App() {
  return (
    <div className="App">
      <header className="header">
        <Intro></Intro>
      </header>
      <Body></Body>
    </div>
  );
}

export default App;
