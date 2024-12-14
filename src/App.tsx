import HomeCreateTest from "./components/modules/home/ui/home-test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageTest from "./components/modules/test/ui/page-test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeCreateTest />} />
        <Route path="/test" element={<PageTest />} />
      </Routes>
    </Router>
  );
}

export default App;
