import React from 'react';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import MapUK from './pages/MapUK.js';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/uk-map" element={<MapUK/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;

// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home.js';
// import MapUK from './pages/MapUK.js';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/uk-map" element={<MapUK/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
