import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Head from './pages/head-pages/head-pages'; 
import LoginPage from './pages/auth-pages/login-page';
import HomePage from './pages/home-pages/home.pages';
import TestPage from './pages/test-pages/test-pages';
import ResultPage from './pages/test-result-pages/test-result.pages';
import TestListPage from './pages/test-list-pages/test-list-pages';
import ProtectedRoute from './pages/auth-pages/protect-route'; 
import ProfileUser from './components/modules/profile-user/ui/profile-user';

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>   
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <>
              <Head /> 
              <Outlet />
            </>
          }
        >  
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/list" element={<TestListPage />} />
          <Route path="/profile" element={<ProfileUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
