import LoginForm from '@components/modules/auth/ui/login-form'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@shared/store/auth.store";
import { RoutesPaths } from '@shared/lib/router';

const LoginPage:React.FC = () => {
    const navigate = useNavigate();
  const { user } = useAuthStore();


  useEffect(() => {
    if (user) {
      navigate(RoutesPaths.about, { replace: true });
    }
  }, [user, navigate]);
return (
    <>
    <LoginForm/>
    </>
)
}
export default LoginPage