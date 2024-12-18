import React from "react";
import { useLocation } from "react-router-dom";
import { useFetchStore } from "../../store/store-test";
import { useState } from "react";
import "../style/test-result.css";
import { Card, Typography, List, Button } from "antd";
const { Title } = Typography;

const ResultTest: React.FC = () => {
  const location = useLocation();
  const { test } = useFetchStore();
  const { answers } = location.state as { answers: number[] };
  const [active, setActive] = useState(false);

  const isCorectQueshion = (questionIndex: number, answerIndex: number) => {
    const question = test?.questions[questionIndex];

    if (!question) return false;

    return question.answers[answerIndex]?.isCorrect ?? false;
  };

  const calcResult = () => {
    const quantityQuestion = test?.questions.length || 0;
    const correctCount = answers.reduce((count, answerIndex, questionIndex) => {
      return count + (isCorectQueshion(questionIndex, answerIndex) ? 1 : 0);
    }, 0);

    return { correctCount, quantityQuestion };
  };

  const { correctCount, quantityQuestion } = calcResult();

  const checkingAnswers = () => {
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

  const correctAnswerIndices = checkingAnswers();

  return (
    <div className="result-container" style={{ padding: "24px" }}>
      <Card
        title={
          <Title level={2}>
            Результаты теста {test?.title || "Без названия"}
          </Title>
        }
        className="result-card"
      >
        <div className="result-card-items">
          <Title className="result-card-title" level={3}>
            Вы набрали {correctCount}/{quantityQuestion} баллов
          </Title>

          <Button
            className="result-card-button"
            onClick={() => setActive(!active)}
            type="primary"
          >
            {active ? "Скрыть" : "Подробнее"}
          </Button>
        </div>
        {active && (
          <List
            dataSource={answers}
            renderItem={(answerIndex, index) => (
              <List.Item>
                <div>
                  <strong className="strong-queshion">
                    Вопрос {index + 1}
                  </strong>
                  <span
                    style={{
                      color:
                        answerIndex === correctAnswerIndices[index]
                          ? "green"
                          : "red",
                    }}
                    className=""
                  >
                    Выбран ответ {answerIndex + 1}
                  </span>
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default ResultTest;
