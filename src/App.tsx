import HomePage from "./pages/home-pages/home.pages";
import TestPage from "./pages/test-pages/test-pages";
import ResultPage from "./pages/test-result-pages/test-result.pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
