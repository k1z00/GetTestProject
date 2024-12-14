import React from "react";
import { Input, Button } from "antd";
import { useFetchStore } from "../../store/store-test";
import { apiClient } from "../../../../shared/lib/api-client";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import "../style/home-test.css";

const { TextArea } = Input;

const HomeCreateTest: React.FC = () => {
  const { setTest } = useFetchStore();
  const [title, setTitle] = React.useState("");
  const [source, setSource] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title || !source) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.FetchTest(title, source);
      setTest(response);
      navigate("/test");
    } catch (error) {
      setError("Не удалось сгенерировать тест. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-container">
      {loading && <Loading />}
      {!loading && (
        <div className="test-items">
          <h2 className="test-title">Создать тест</h2>
          <div className="test-inputfield">
            <TextArea
              rows={19}
              placeholder="Заголовок"
              value={title}
              onChange={handleTextAreaChange}
              className="test-texarea"
            />
            <div className="test-input">
              <Input
                placeholder="Источник"
                value={source}
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit} disabled={loading}>
                 Создать тест
              </Button>
            </div>
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default HomeCreateTest;
