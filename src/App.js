import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NorwegianMap from "./components/NorwegianMap.js";
import AnimalConflicts from "./components/AnimalConflicts.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NorwegianMap />} />
        <Route path="/dyrekonflikter" element={<AnimalConflicts />} />
      </Routes>
    </Router>
  );
}

export default App;
