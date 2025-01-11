import React from "react";
import { Input, Button, message } from "antd";
import { useFetchStore } from "@shared/store/store-test";
import { apiClient } from "@shared/lib/api-client";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import "../style/home-test.css";
import { useAuthStore } from "@shared/store/auth.store";
import { RoutesPaths } from '@shared/lib/router'
import { TestResponse } from "@app/models/test";




const { TextArea } = Input;

const HomeCreateTest: React.FC = () => {
  const { user: authUser } = useAuthStore();
  const { setTest } = useFetchStore();
  const [title, setTitle] = React.useState("");
  const [source, setSource] = React.useState("");
  const [loading, setLoading] = React.useState(false);

 

  type ApiFunctionType = (title?: string, source?: string) => Promise<TestResponse>;

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

 
  const handleSubmit = async () => {
    if (!title) {
      messageApi.error("Пожалуйста, заполните поле информации о желаемом тесте");
      return;
    }

    setLoading(true);

    const handleTestCreation = async (apiFunction: ApiFunctionType)  => {
      try {
        const response = await apiFunction(title, source);
        setTest(response);
        navigate(RoutesPaths.Test(response.id))
        
        messageApi.success("Тест успешно создан!");
        return response;
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          console.error(error.message);
          messageApi.error("Ошибка при создании теста: " + error.message);
        } else {
          console.error("Произошла неизвестная ошибка:", error);
          messageApi.error("Произошла неизвестная ошибка.");
        }
      }
    };

    if (authUser) {
      await handleTestCreation(apiClient.FetchTest);
    } else {
      await handleTestCreation(apiClient.FetchGuesTest);
    }

    setLoading(false);
  };


  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  return (
    <div className="test-container">
      {contextHolder}
      {loading && <Loading />}
      {!loading && (
        <div className="test-items">
          <div className="test-item-head">
            <h2 className="test-title">Создать тест</h2>
          </div>
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
              <Button className="button-home" onClick={handleSubmit}>
                Создать тест
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCreateTest;
