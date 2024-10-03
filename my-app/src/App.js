import logo from './logo.svg';
import './App.css';

function HelloWorld() {
  return <h1 className="greeting">Hello, world!</h1>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld></HelloWorld>
      </header>
    </div>
  );
}

export default App;
