
import { useFetchStore } from "../../store/store-test";
import './page-test.css'

const PageTest: React.FC = () => {
  const { test } = useFetchStore();


  
  if (!test) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="page-test-container">
      <div className="page-test-items">
        <h1 className="page-test-title">{test.title}</h1>
        <ul>
          {test.questions.map((question, index) => (
            <li key={index}>
              <h3>{question.text}</h3>
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    {answer.value} {answer.isCorrect ? "(Правильно)" : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageTest;
