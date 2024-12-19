import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useFetchStore } from "../../../../shared/store/store-test";
import { useTestResultsStore } from "../../../../shared/store/store-result";
import { useState, useEffect } from "react";
import "../style/test-result.css";
import { Card, Typography, List, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
const { Title } = Typography;

const ResultTest: React.FC = () => {
  const location = useLocation();
  const { test } = useFetchStore();
  const { answers } = location.state as { answers: number[] };
  const [active, setActive] = useState(false);
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<
    number | null
  >(null);
const addResult = useTestResultsStore((state) => state.addResult);

useEffect(() => {
  if (test?.id) {
    addResult(test.id, correctCount);
  }
}, [test?.id, addResult]);


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

  const getQuestionDetails = (index: number, answerIndex: number) => {
    const correctAnswerIndices = checkingAnswers();
    const isExpanded = expandedQuestionIndex === index;
    const question = test?.questions[index];
    const selectedAnswer = question?.answers[answerIndex];
    const selectedAnswerText = selectedAnswer?.value;
    const isCorrect = answerIndex === correctAnswerIndices[index];
    return {
      selectedAnswerText,
      isCorrect,
      isExpanded,
    };
  };

  return (
    <div className="result-container" style={{ padding: "24px" }}>
      <Card
        className="result-card"
        title={
          <div className="result-head">
            <Title level={2} className="result-head-title">
              Результаты теста {test?.title || "Без названия"}
            </Title>
            <HomeButton />
          </div>
        }
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
            renderItem={(answerIndex, index) => {
              const { selectedAnswerText, isCorrect, isExpanded } =
                getQuestionDetails(index, answerIndex);
              return (
                <List.Item style={{ display: "block" }}>
                  <div className="list-items">
                    <div className="list-item">
                      <strong className="strong-queshion">
                        Вопрос {index + 1}
                      </strong>
                      <span
                        className={`selected-answer ${
                          isCorrect ? "correct" : ""
                        }`}
                      >
                        Выбран ответ {answerIndex + 1}
                      </span>
                    </div>
                    <div>
                      <Button
                        type="text"
                        icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                        onClick={() =>
                          setExpandedQuestionIndex(isExpanded ? null : index)
                        }
                      >
                        {isExpanded ? "Скрыть ответ" : "Показать ответ"}
                      </Button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div>
                      <strong style={{marginRight: '10px'}}>Выбранный вариант</strong>
                      <span
                        className={`selected-answer ${
                          isCorrect ? "correct" : ""
                        }`}
                      >
                        {selectedAnswerText}
                      </span>
                    </div>
                  )}
                </List.Item>
              );
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default ResultTest;

const HomeButton = () => {
  return (
    <Link to="/">
      <Button type="primary" size="large">
        На главную
      </Button>
    </Link>
  );
};
