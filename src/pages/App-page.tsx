import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Head from './head-pages/head-pages';
import LoginPage from './auth-pages/login-page';
import HomePage from './home-pages/home.pages';
import TestPage from './test-pages/test-pages';
import ResultPage from './test-result-pages/test-result.pages';
import TestListPage from './test-list-pages/test-list-pages';
import ProtectedRoute from './auth-pages/protect-route';
import ProfileUser from '../components/modules/profile-user/ui/profile-user';
import SingUpPage from './auth-pages/singup-page';



function AppPage() {
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
                    <Route path="/list" element={<TestListPage />} />
                    <Route path="/test/:id" element={<TestPage />} />
                    <Route path="/results" element={<ResultPage />} />
                    <Route path="/profile" element={<ProfileUser />} />
                    <Route path="/singup" element={<SingUpPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppPage;