import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useAuthStore } from "../../../../shared/store/auth.store";
import '../style/login-form.css'

const SignUpForm = () => {
    const [form] = Form.useForm();
    const { signUp, isLoading } = useAuthStore();
    const navigate = useNavigate()

    const onFinish = async (values: {
        email: string;
        verificationCode: string;
        password: string;
        name: string
    }) => {
        try {
            const { email, verificationCode, password, name } = values;
            await signUp(email, verificationCode, password, name);
            message.success("Registration successful!");
        } catch  {
            message.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="login-form-container">
            <h2 className="login-form-title">Регистрация</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Name"
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
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>
                <Form.Item>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button onClick={() => navigate('/login')} type="primary" htmlType="submit" loading={isLoading} block>
                            Зарегестрироваться
                        </Button>
                        <Button onClick={() => navigate('/login')} type="primary" >
                            Вернуться
                        </Button>

                    </div>

                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpForm;
