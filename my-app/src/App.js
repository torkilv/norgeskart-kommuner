import './App.css';

function Intro() {
  return <div className="Intro">
    <h2>Sophie Stone</h2>
    {/* Sites */}
  </div>
}

function ProjectList({projects}) {
  return (
    <div className="projectList body">
    <h1>Projects</h1>
    <section>
      {/* Projects */}
      <h3></h3>
    </section>
    </div>
  )
}

function Project({project}) {
  
}

function App() {
  return (
    <div className="App">
      <header className="header">
        <Intro></Intro>
      </header>
        <ProjectList></ProjectList>
    </div>
  );
}

export default App;
