import LoginForm from "../../components/modules/auth/ui/login-form";
  import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../shared/store/auth.store";

const LoginPage:React.FC = () => {
    const navigate = useNavigate();
  const { user, login } = useAuthStore();


  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
return (
    <>
    <LoginForm/>
    </>
)
}
export default LoginPage