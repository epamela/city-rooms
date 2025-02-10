import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchPlaces } from "./pages/Search";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPlaces />} />
      </Routes>
    </Router>
  );
}

export default App;
