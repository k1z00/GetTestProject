import { apiClient } from "../../../../shared/lib/api-client";
import { useState, useEffect } from "react";
import "../style/test-list.css";
import { Link, useNavigate } from "react-router-dom";
import { PaginatedTestsResponse } from "../../../../types/models/test";
import { Card, Button, List, Typography, Spin } from "antd";
import { useAuthStore } from "../../../../shared/store/auth.store";
import { TestResponse } from "../../../../types/models/test";

const { Title, Paragraph } = Typography;

const TestList: React.FC = () => {
  const [testsList, setTestsList] = useState<TestResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalTests, setTotalTests] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { user: authUser } = useAuthStore();
  const navigate = useNavigate();

  const fetchTestsList = async (page: number) => {
    setLoading(true);

    try {
      const response: PaginatedTestsResponse = await apiClient.FetchTestsList(page);
      const { data, pagination } = response;
      if (data) {
        setTestsList(data);
        setTotalTests(pagination.total);
      }
    } catch {
      console.log("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestsList(page);
  }, [page]);

  if (!authUser) {
    return (
      <div className="profile-container">
        <Card className="profile-items" title={<Title level={1}>Список тестов</Title>}>
          <Paragraph>Для доступа к списку тестов необходимо быть авторизованным</Paragraph>
          <Button onClick={() => navigate('/login')} type="primary">
            Войти
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) return <Spin tip="Загрузка..." size="large" />;

  return (
    <div className="test-list-container">
      <div className="test-list-items">
        <div className="test-list-items-head">
          <div className="list-items-head-text">
            <Title level={1} className="test-list-items-title">Список тестов</Title>
            <Paragraph>Всего тестов: {totalTests}</Paragraph>
          </div>
        </div>

        <List
          className="test-list-items-ul"
          dataSource={testsList}
          renderItem={(test) => (
            <List.Item className="test-list-items-li" key={test.id}>
              <div>
                <Title level={3}>{test.title}</Title>
                <Paragraph>Источник: {test.source}</Paragraph>
              </div>
              <div>
                <Link to={`/test/${test.id}`}>
                  <Button className="test-list-items-li-button" type="primary">
                    Пройти
                  </Button>
                </Link>
              </div>
            </List.Item>
          )}
        />

        <div className="button-pagination">
          <Button
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}
          >
            Предыдущая страница
          </Button>
          <Button
            type="primary"
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={testsList.length === 0 || testsList.length < 10}
          >
            Следующая страница
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestList;
