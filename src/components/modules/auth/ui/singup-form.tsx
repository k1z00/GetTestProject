import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useAuthStore } from "@shared/store/auth.store";
import { RoutesPaths } from "@shared/lib/router";
import '../style/login-form.css';




const SignUpForm = () => {
    const [form] = Form.useForm();
    const { signUp, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const onFinish = async (values: {
        email: string;
        verificationCode: string;
        password: string;
        name: string;
    }) => {
        try {
            const { email, verificationCode, password, name } = values;
            await signUp(email, verificationCode, password, name);
            navigate(RoutesPaths.login)
            message.success("Регистрация прошла успешно!"); 
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            message.error("Регистрация не удалась. Пожалуйста, попробуйте снова.");
        }
    };

    return (
        <div className="login-form-container">
            <h2 className="login-form-title">Регистрация</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        { required: true, message: "Пожалуйста, введите ваше имя!" },
                        { min: 2, message: "Имя должно содержать не менее 2 символов!" },
                        { max: 50, message: "Имя должно содержать не более 50 символов!" },
                        {
                            pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                            message: "Имя может содержать только буквы и пробелы!",
                        },
                    ]}
                >
                    <Input placeholder="Введите ваше имя" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Пожалуйста, введите ваш email!" },
                        { type: "email", message: "Некорректный email!" },
                    ]}
                >
                    <Input placeholder="Введите email" />
                </Form.Item>

                <Form.Item
                    label="Код подтверждения"
                    name="verificationCode"
                    rules={[
                        { required: true, message: "Пожалуйста, введите код подтверждения!" },
                        { min: 6, message: "Код должен содержать не менее 6 символов!" },
                        { max: 6, message: "Код должен содержать не более 6 символов!" },
                    ]}
                >
                    <Input placeholder="Введите код подтверждения" />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: "Пожалуйста, введите пароль!" },
                        { min: 8, message: "Пароль должен содержать не менее 8 символов!" },
                    ]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', gap: '10px' }} className=" container-button">
                        <Button type="primary" htmlType="submit" loading={isLoading} block>
                            Зарегистрироваться
                        </Button>
                        <Button onClick={() => navigate(RoutesPaths.login)} type="default">
                            Вернуться
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpForm;
