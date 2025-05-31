import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NorwegianMap from "./components/NorwegianMap.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NorwegianMap />} />
      </Routes>
    </Router>
  );
}

export default App;
