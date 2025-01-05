import React, { useState, useEffect } from "react";
import { useFetchStore } from "../../../../shared/store/store-test";
import { Button, Radio, Card, Typography, Space, Spin } from "antd";
import "../style/page-test.css";
import { useParams, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const TestContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { test, fetchTestById } = useFetchStore();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      fetchTestById(Number(id));
    }
  }, [id, fetchTestById]);

  useEffect(() => {
    if (test && test.questions) {
      setSelectedAnswers(new Array(test.questions.length).fill(undefined));
    }
  }, [test]);

  if (!test) {
    return <Spin tip="Загрузка данных..." size="large" />;
  }

  const handleRadioChange = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[selectedQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedQuestionIndex < test.questions.length - 1) {
      setSelectedQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    navigate(`/results`, {
      state: { answers: selectedAnswers },
    });
  };

  const isAnswerSelected = selectedAnswers[selectedQuestionIndex] !== undefined;
  const currentQuestion = test.questions[selectedQuestionIndex];

  return (
    <div className="page-test-container">
      <Card className="page-test-items">
        <Title level={2} className="page-test-title">
          <p>Вопрос {selectedQuestionIndex + 1}</p>
        </Title>
        <Card className="page-question-card">
          <Title level={4} className="page-ques-title">
            <p>{currentQuestion.text}</p>
          </Title>
          <Space direction="vertical" className="page-ques-ul">
            {currentQuestion.answers.map((answer, answerIndex) => (
              <Card
                key={answerIndex}
                className={`ques-option-card ${selectedAnswers[selectedQuestionIndex] === answerIndex
                    ? "selected"
                    : ""
                  }`}
                onClick={() => handleRadioChange(answerIndex)}
              >
                <Radio
                  name={`question-${selectedQuestionIndex}`}
                  checked={
                    selectedAnswers[selectedQuestionIndex] === answerIndex
                  }
                  onChange={() => handleRadioChange(answerIndex)}
                >
                  <Text ><p>{answer.value}</p></Text>
                </Radio>
              </Card>
            ))}
          </Space>
        </Card>
        <div className="navigation-buttons">
          <Button
            onClick={handlePrevQuestion}
            disabled={selectedQuestionIndex === 0}
            className="navigation-buttons-button"
          >
            Предыдущий
          </Button>
          <Button
           
            className="navigation-buttons-button"
            onClick={
              selectedQuestionIndex < test.questions.length - 1
                ? handleNextQuestion
                : handleFinish
            }
            disabled={!isAnswerSelected}
          >
            {selectedQuestionIndex < test.questions.length - 1
              ? "Следующий вопрос"
              : "Завершить тест"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestContent;
