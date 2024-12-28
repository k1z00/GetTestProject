import React, { useEffect, useState } from "react";
import { apiClient } from "../../../../shared/lib/api-client";
import { useAuthStore } from "../../../../shared/store/auth.store";
import { User } from '../../../../types/models/test'
import '../style/profile-user.css'
import { Card, Button } from "antd";

const ProfileUser: React.FC = () => {
    const { user: authUser } = useAuthStore();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authUser) {
                setError("Пользователь не авторизован.");
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userData = await apiClient.getUserById(authUser.id.toString());
                setUser(userData);
            } catch (err) {
                setError("Ошибка при загрузке данных пользователя.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [authUser]);

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!user) {
        return <p>Пользователь не найден.</p>;
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
                <div className="Button-exit">
                    <Button type="primary">Выйти</Button>
                </div>

            </Card >
        </div>


    );
};

export default ProfileUser;
