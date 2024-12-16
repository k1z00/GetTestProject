import React, { useState } from "react";
import { useFetchStore } from "../../store/store-test";
import {  Button, Radio } from "antd";
import "../style/page-test.css";
import { useNavigate } from "react-router-dom";


const TestContent: React.FC  = () => {
  const { test } = useFetchStore();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
   const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(test?.questions.length).fill(undefined)
  );
 

  if (!test) {
    return <div>Загрузка данных...</div>;
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

  const handleFinish = () => {
    navigate("/results", {
      state: { answers: selectedAnswers },
    });
  };

  console.log(selectedAnswers);

  const isAnswerSelected = selectedAnswers[selectedQuestionIndex] !== undefined;
  const currentQuestion = test.questions[selectedQuestionIndex];

  return (
    <div className="page-test-container">
      <div className="page-test-items">
        <h1 className="page-test-title">Вопрос {selectedQuestionIndex + 1}</h1>
        <ul className="page-quesion">
          <li className="page-ques" key={selectedQuestionIndex}>
            <h2 className="page-ques-title">{currentQuestion.text}</h2>
            <ul className="page-ques-ul">
              {currentQuestion.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>
                  <label>
                    <div className="ques-options">
                      <p>{answer.value}</p>
                      <Radio
                        type="radio"
                        name={`question-${selectedQuestionIndex}`}
                        checked={
                          selectedAnswers[selectedQuestionIndex] === answerIndex
                        }
                        onChange={() => handleRadioChange(answerIndex)}
                      />
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className="navigation-buttons">
          <Button
            type="primary"
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
      </div>
    </div>
  );
};

export default TestContent;
