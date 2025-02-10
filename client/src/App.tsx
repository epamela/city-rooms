import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";

import { SearchPlaces } from "./pages/Search";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<SearchPlaces />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
