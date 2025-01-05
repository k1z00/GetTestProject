import React, { useEffect, useState } from "react";
import { apiClient } from "../../../../shared/lib/api-client";
import { useAuthStore } from "../../../../shared/store/auth.store";
import { User } from '../../../../types/models/test'
import '../style/profile-user.css'
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";


const ProfileUser: React.FC = () => {
    const navigate = useNavigate()
    const { user: authUser } = useAuthStore();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const logout = useAuthStore((state) => state.logout)


    useEffect (() => {
        const fetchUserData = async () => {
            if (!authUser) {
                setError("Пользователь не авторизован.");
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userData = await apiClient.GetUserById(authUser.id.toString());
                setUser(userData);
            } catch {
                setError("Ошибка при загрузке данных пользователя.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [authUser]) 
        
   


    if (!authUser) {
        return (
            <div className="profile-container">
                <Card className="profile-items" title={<h1>Профиль</h1>}>
                    <p >Для просмотра профиля необходимо авторизоваться.</p>
                    <div className="button-container">
                    <Button className="Button-exit" onClick={() => navigate('/login')}>
                        Войти
                    </Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!user) {
        return <p>Пользователь не найден.</p>;
    }

    const hendelLogout = () => {
        logout()
        navigate('/')
    }

    return (

        <div className="profile-container">

            <Card
                className="profile-items"
                title={
                    <h1>Профиль</h1>
                } >
                <div className="profile-items-info">
                    <p><strong>Имя</strong> {user.name}</p>
                    <p><strong>Дата создания </strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="button-container">
                    <Button className="Button-exit" onClick={hendelLogout} >Выйти</Button>
                </div>

            </Card >
        </div>


    );
};

export default ProfileUser;
