import { apiClient } from "../../../../shared/lib/api-client";
import { useState, useEffect } from "react";
import "../style/test-list.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Answer {
  value: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  typeAnswer: string;
  answers: Answer[];
}

interface TestResponse {
  id?: number;
  title: string;
  seed: string;
  source: string;
  questions: Question[];
  counts: number;
}

const TestList: React.FC = () => {
  const [testsList, setTestsList] = useState<TestResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalTests, setTotalTests] = useState(0); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestsList = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response: any = await apiClient.FetchTestsList(page);

      const { data, pagination } = response;

      if (data) {
        setTestsList(data);
        setTotalTests(pagination.total);
      }
    } catch (err) {
      setError("Ошибка при загрузке списка тестов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestsList(page);
  }, [page]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="test-list-contsiner">
      <div className="test-list-items">
        <div className="test-list-items-head">
          <h1 className="test-list-items-title">Список тестов</h1>
          <p>Всего тестов: {totalTests}</p>
        </div>
        <ul className="test-list-items-ul">
          {testsList?.map((test) => (
            <li className="test-list-items-li" key={test.id}>
              <h3>{test.title}</h3>
              <p>Источник: {test.source}</p>
              <Link to={`/test/${test.id}`}>
                <Button type="primary">Пройти</Button>
              </Link>
            </li>
          ))}
        </ul>
        <div>
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
