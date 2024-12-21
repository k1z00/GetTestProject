import HomePage from "./pages/home-pages/home.pages";
import TestPage from "./pages/test-pages/test-pages";
import ResultPage from "./pages/test-result-pages/test-result.pages";
import TestListPage from "./pages/test-list-pages/test-list-pages";
import LoginPage from "./pages/auth/login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/auth/protect-route";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
         <Route path="/login" element={<LoginPage/>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/list" element={<TestListPage />} />
      </Routes>
    </Router>
  );
}

export default App;