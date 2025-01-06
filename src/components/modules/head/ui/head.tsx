import React from "react"
import { Link } from 'react-router-dom';
import ThemeToggle from "../../theme/ui/theme";
import '../style/head.css'
import { useAuthStore } from "@shared/store/auth.store";


const Head: React.FC = () => {
    const { user: authUser } = useAuthStore();




    return (
        <div className="head-container">
            <div className="head-items">
                <div className="head-item-info" >
                    <Link to="/" className="custom-link">
                        Главная
                    </Link>
                    {authUser && (
                        <>
                            <Link to="/list" className="custom-link">
                                Список тестов
                            </Link>
                            <Link to="/mytest" className="custom-link">
                                Мои тесты
                            </Link>
                        </>
                    )}
                </div>
                <div className="head-item-right" >
                    <Link to="/profile" className="custom-link">
                        <img className="img-user" src="/img/user.png" alt="" />
                    </Link>
                    <ThemeToggle />
                </div>

            </div>


        </div>
    )
}

export default Head