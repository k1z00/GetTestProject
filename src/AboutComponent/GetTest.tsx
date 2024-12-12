import { Input } from "antd";
import React, { useState } from "react";
import "./get-test.css";
import ButtonTest from "./ButtonTest";
import { ofetch } from "ofetch";
import { LlvmTest } from "../model/test";

import Loading from "./Loading";

const GetTest: React.FC = () => {
  const [Test, setTest] = useState<LlvmTest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const [inputValue, setInputValue] = useState<{
    source: string;
    title: string;
  }>({
    source: "",
    title: "",
  });

  const { TextArea } = Input;

  async function GenerateTest() {
    try {
      setIsLoading(true);
      const response = await ofetch<LlvmTest>(
        "http://localhost:8000/api/v1/llvm/test",
        {
          method: "POST",
          body: {
            title: inputValue.title,
            source: "Любые источники",
            counts: 5,
          },
        }
      );

      setTest(response);
      setSelectedQuestionIndex(0);

      if (response && response.questions) {
        const initialSelectedAnswers = response.questions.map(() => -1);
        setSelectedAnswers(initialSelectedAnswers);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      source: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setInputValue({
      source: "",
      title: "",
    });

    GenerateTest();
  };

  const NextQuestion = () => {
    if (Test && selectedQuestionIndex < Test.questions.length - 1) {
      setSelectedQuestionIndex((prev) => prev + 1);
    }
  };

  const PervQuestion = () => {
    if (selectedQuestionIndex === 0) return;
    setSelectedQuestionIndex((prev) => prev - 1);
  };

  const handleRadioChange = (answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = [...prev];
      newSelectedAnswers[selectedQuestionIndex] = answerIndex;
      return newSelectedAnswers;
    });
  };

  const checkAllAnswers = () => {
    if (!Test) return;

    let score = 0;

    Test.questions.forEach((question, questionIndex) => {
      const userAnswerIndex = selectedAnswers[questionIndex];

      if (userAnswerIndex === -1) {
        return;
      }

      const correctAnswerIndex = question.answers.findIndex(
        (answer) => answer.isCorrect
      );

      if (userAnswerIndex === correctAnswerIndex) {
        score++;
      }
    });

    alert(`Вы набрали ${score} из ${Test.questions.length} баллов!`);
  };

  return (
    <>
      <div className="test-container">
        <h1 className="test-title">Create test</h1>
        <div className="test-items">
          <div className="test-items-input">
            <TextArea
              rows={25}
              placeholder="Test"
              value={inputValue.title}
              onChange={handleTextAreaChange}
            />
            <div className="test-item-input">
              <Input
                placeholder="Source"
                className="input"
                value={inputValue.source}
                onChange={handleInputChange}
              />
              <ButtonTest onClick={handleSubmit}>Создать Тест</ButtonTest>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loading />}

      {Test && !isLoading && (
        <div className="queshion-container">
          <div className="queshion-items">
            <h3 className="queshion-title">
              Вопрос {selectedQuestionIndex + 1}
            </h3>
            <p className="queshion-text">
              {Test.questions[selectedQuestionIndex].text}
            </p>
            <ul className="queshion-ul">
              {Test.questions[selectedQuestionIndex].answers.map(
                (answer, answerIndex) => (
                  <div className="queshion-li-items" key={answerIndex}>
                    <li className="queshion-li">{answer.value}</li>
                    <input
                      type="radio"
                      name={`question-${selectedQuestionIndex}`} 
                      checked={
                        selectedAnswers[selectedQuestionIndex] === answerIndex
                      }
                      onChange={() => handleRadioChange(answerIndex)}
                    />
                  </div>
                )
              )}
            </ul>

            <div className="Button-ques-items">
              <ButtonTest className="Button-ques" onClick={PervQuestion}>
                Пред
              </ButtonTest>
              <ButtonTest className="Button-ques" onClick={NextQuestion}>
                Cлед
              </ButtonTest>
              <ButtonTest
                disabled={selectedAnswers.includes(-1)}
                className={`Button-ques ${
                  selectedAnswers.includes(-1) ? "disabled-button" : ""
                }`}
                onClick={checkAllAnswers}
              >
                Проверить все ответы
              </ButtonTest>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetTest;


console.log(parseInt('3'))