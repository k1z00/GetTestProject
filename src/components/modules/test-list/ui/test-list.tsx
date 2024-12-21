import { apiClient } from "../../../../shared/lib/api-client";
import { useTestResultsStore } from "../../../../shared/store/store-result";
import { useState, useEffect } from "react";
import HomeButton from "../../Ui/home-button";
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

 const testResults = useTestResultsStore((state) => state.results);


const fetchTestsList = async (page: number) => {
    setLoading(true);
    setError(null);



try{
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
}


  useEffect(() => {
    fetchTestsList(page);
  }, [page]);




  if (loading) return <div>Загрузка...</div>;


return (
  <div className="test-list-contsiner">
    <div className="test-list-items">
      <div className="test-list-items-head">
        <div className="list-items-head-text">
         <h1 className="test-list-items-title">Список тестов</h1>
        <p>Всего тестов: {totalTests}</p>
        </div>
         <HomeButton />
      </div>
      
      <ul className="test-list-items-ul">
        {testsList?.map((test) => (
          <li className="test-list-items-li" key={test.id}>
            <div>
              <h3>{test.title}</h3>
              <p>Источник: {test.source}</p>
              {testResults[test.id!] !== undefined && (
                <p
                  style={{
                    color: testResults[test.id!] < 3 ? "red" : "green", 
                  }}
                 >
                  Набранные баллы : {testResults[test.id!]}
                </p>
              )}
            </div>
            <div>
              <Link to={`/test/${test.id}`}>
                <Button className="test-list-items-li-button" type="primary">
                  Пройти
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
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
