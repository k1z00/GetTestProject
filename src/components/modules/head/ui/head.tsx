import React from "react";
import { Link } from 'react-router-dom';
import ThemeToggle from "../../theme/ui/theme";
import '../style/head.css';
import { useAuthStore } from "@shared/store/auth.store";
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const Head: React.FC = () => {
    const { user: authUser } = useAuthStore();
    const [visible, setVisible] = React.useState(false); // Состояние для управления видимостью Drawer


    const showDrawer = () => {
        setVisible(true);
    };


    const onClose = () => {
        setVisible(false);
    };

    
    const menu = (
        <Menu mode="vertical">
            <Menu.Item key="1">
                <Link to="/" className="custom-link" onClick={onClose}>
                    Главная
                </Link>
            </Menu.Item>
            {authUser && (
                <>
                    <Menu.Item key="2">
                        <Link to="/list" className="custom-link" onClick={onClose}>
                            Список тестов
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/mytest" className="custom-link" onClick={onClose}>
                            Мои тесты
                        </Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <div className="head-container">
            <div className="head-items">
                <Button
                    className="burger-menu"
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                />
                <div className="head-item-info">
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


                <div className="head-item-right">
                    <Link to="/profile" className="custom-link">
                        <img className="img-user" src="/img/user.png" alt="" />
                    </Link>
                    <ThemeToggle />
                </div>
            </div>


            <Drawer
                title="Меню"
                placement="left"
                onClose={onClose}
                visible={visible}
                width={250}
                className="Drawer-head"
            >
                {menu}
            </Drawer>
        </div>
    );
};

export default Head;
