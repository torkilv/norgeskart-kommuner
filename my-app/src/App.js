import logo from './logo.svg';
import './App.css';

function Intro() {
  return <h1 className="greeting">Sophie Stone</h1>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Intro></Intro>
      </header>
    </div>
  );
}

export default App;
