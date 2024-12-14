import HomeCreateTest from "./modules/home/ui/home-test";
import PageTest from "./modules/test/ui/page-test";
import ResultTest from "./modules/test-result/ui/test-result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<HomeCreateTest />} />
        <Route path="/test" element={<PageTest />} />
        <Route path="/results" element={<ResultTest />} />
      </Routes>
    </Router>
  );
}

export default App;
