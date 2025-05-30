import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NorwegianMap from "./components/NorwegianMap.js";
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NorwegianMap  />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
