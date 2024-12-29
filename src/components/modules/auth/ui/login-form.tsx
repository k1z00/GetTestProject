import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAuthStore } from "../../../../shared/store/auth.store";
import "../style/login-form.css";
import { useNavigate } from "react-router-dom";




const LoginForm: React.FC = () => {
  const { login, isLoading} = useAuthStore();
  const [form] = Form.useForm();
  const navigate = useNavigate()



  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      await login(email, password);
      message.success("Вы успешно вошли в систему!");
    } catch (err) {
      if (err instanceof Error) {
        console.error("An error occurred:", err.message);
      } else {
        console.error("An unknown error occurred:", err);
      }
  } }; 

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Авторизация</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Войти
            </Button>
            <Button onClick={() => navigate('/singup')} type="primary" >
              Регистрация
            </Button>
          </div>

        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
