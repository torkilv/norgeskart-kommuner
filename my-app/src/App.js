import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.js';
import MapUK from './pages/map.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/uk-map" element={<MapUK/>} />
      </Routes>
    </Router>
  );
}

export default App;
