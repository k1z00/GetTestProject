import { useEffect } from "react";
import { useTestStore } from "../store/store-test";

const PageTest: React.FC = () => {
  const { data } = useTestStore();

  if (!data) {
    return <div>No data available. Please generate a test first.</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Source: {data.source}</p>
      <p>Seed: {data.seed}</p>
      <ul>
        {data.questions.map((question, index) => (
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
  );
};

export default PageTest;
