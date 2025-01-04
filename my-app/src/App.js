import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import MapUK from './pages/MapUK.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/uk-map" element={<MapUK/>}/>
        <Route path="*" element={<Home/>} /> {/* Return to root for smstone0.github.io/#/{invalid} URLs */}
      </Routes>
    </Router>
  );
}

export default App;