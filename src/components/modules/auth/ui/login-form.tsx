import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAuthStore } from "../../../../shared/store/auth.store";
import "../style/login-form.css";

const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      login(email, password);
      message.success("Вы успешно вошли в систему!");
    } catch (err) {
      message.error("Ошибка авторизации. Попробуйте снова.");
    }
  };

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

        {error && <div className="error-message">{error}</div>}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;