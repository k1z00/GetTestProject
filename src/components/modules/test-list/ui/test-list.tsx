import { apiClient } from "@shared/lib/api-client";
import { useState, useEffect } from "react";
import "../style/test-list.css";
import { Link} from "react-router-dom";
import { PaginatedTestsResponse } from "@app/models/test";
import {  Button, List, Typography, Spin } from "antd";
import { TestResponse } from "@app/models/test";
import { RoutesPaths } from "@shared/lib/router";

const { Title, Paragraph } = Typography;

const TestList: React.FC = () => {
  const [testsList, setTestsList] = useState<TestResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalTests, setTotalTests] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  
 

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


  if (loading) return <Spin tip="Загрузка..." size="large" />;

  return (
    <div className="test-list-container">
      <div className="test-list-items">
        <div className="test-list-items-head">
          <div className="list-items-head-text">
            <Title level={1} className="test-list-items-title">Список тестов</Title>
            <Paragraph><p>Всего тестов: {totalTests}</p></Paragraph>
          </div>
        </div>

        <List
          className="test-list-items-ul"
          dataSource={testsList}
          renderItem={(test) => (
            <List.Item className="test-list-items-li" key={test.id}>
              <div className="text-info">
                <Title level={3}>{test.title}</Title>
                <Paragraph><p>Источник: {test.source}</p></Paragraph>
              </div>
              <div>
                <Link to={RoutesPaths.Test(test.id.toString())}>
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
            className="button-pagination-btn"
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}
          >
            Предыдущая страница
          </Button>
          <Button
            className="button-pagination-btn"
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