

import React from "react";
import { useLocation } from "react-router-dom";

const ResultTest: React.FC = () => {
  const location = useLocation();
  const { answers } = location.state as { answers: number[] };

  console.log(answers);

  return (
    <div>
      <h2>Результаты теста</h2>
      <ul>
        {answers.map((answerIndex, index) => (
          <li key={index}>
            Вопрос {index + 1}: Выбран ответ {answerIndex + 1} Правильный ответ 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultTest;