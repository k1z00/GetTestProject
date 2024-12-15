import React from "react";
import { useLocation } from "react-router-dom";
import { useFetchStore } from "../../store/store-test";
import "../style/test-result.css";


const ResultTest: React.FC = () => {
  const location = useLocation();
  const { answers } = location.state as { answers: number[] };
  const { test } = useFetchStore();
  

  const isCorectQueshion = (questionIndex: number, answerIndex: number) => {
    const question = test?.questions[questionIndex];

    if (!question) return false;


    return question.answers[answerIndex]?.isCorrect ?? false;
  };

  const calcResult = () => {
    let correctCount = 0;
    const quantityQuestion = test?.questions.length;

    answers.forEach((answerIndex, questionIndex) => {
      if (isCorectQueshion(questionIndex, answerIndex)) {
        correctCount++;
      }
    });

    return { correctCount, quantityQuestion };
  };

  const { correctCount, quantityQuestion } = calcResult();



  const quesTrue = () => {
    const correctAnswerIndices = answers.map((_, index) => {
      const ques = test?.questions[index];
      if (!ques) return null;

      const correctAnswerIndex = ques.answers.findIndex(
        (answer) => answer.isCorrect
      );

      return correctAnswerIndex;
    });

    return correctAnswerIndices.filter((index) => index !== null);
  };

  const correctAnswerIndices = quesTrue();

  return (
    <div className="result-container">
      <div className="result-items">
        <h2 className="result-items-title">Результаты теста</h2>
        <h3 className="result-items-text">
          Вы набрали {correctCount}/{quantityQuestion} Баллов{" "}
          {test?.questions.length}
        </h3>
        <ul className="result-items-ul">
          {answers.map((answerIndex, index) => (
            <li key={index}>
              Вопрос {index + 1}: Выбран ответ {answerIndex + 1} Правильный
              ответ {correctAnswerIndices[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultTest;
