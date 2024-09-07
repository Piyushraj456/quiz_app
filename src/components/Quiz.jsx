import React, { useState, useEffect } from "react";
import "./quiz.css";
import QuizSettings from "./QuizSettings";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [quizSettings, setQuizSettings] = useState(null);

  useEffect(() => {
    if (quizSettings) {
      fetchQuizData();
    }
  }, [quizSettings]);

  const fetchQuizData = async () => {
    const { numQuestions, category, difficulty } = quizSettings;
    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuizData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (numQuestions, category, difficulty) => {
    setQuizSettings({ numQuestions, category, difficulty });
  };

  const handleNext = () => {
    if (index < quizData.length - 1) {
      setIndex(index + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === quizData[index].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswered(false);
    setShowScore(false);
    setQuizSettings(null);
  };

  if (!quizSettings) {
    return <QuizSettings onStartQuiz={handleStartQuiz} />;
  }

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"100px" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!quizData || quizData.length === 0) {
    return <div>No quiz data available.</div>;
  }

  const currentQuestion = quizData[index];
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];

  answers.sort(() => Math.random() - 0.5);

  const getEmoji = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) return "😎";
    if (percentage >= 75) return "😊";
    if (percentage >= 50) return "😐";
    return "😢";
  };

  const getScoreStyle = () => {
    const percentage = (score / quizData.length) * 100;
    return {
      background: `conic-gradient(#9ADBB9 ${percentage}%, #F79696 ${percentage}% 100%)`,
    };
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!showScore ? (
        <>
          <h4>
            {index + 1}. {currentQuestion.question}
          </h4>
          <ul>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => handleAnswerClick(answer)}
                style={{
                  backgroundColor: isAnswered
                    ? answer === currentQuestion.correct_answer
                      ? "#9ADBB9"
                      : answer === selectedAnswer
                      ? "#F79696"
                      : "white"
                    : "white",
                  pointerEvents: isAnswered ? "none" : "auto",
                  cursor: isAnswered ? "default" : "pointer",
                }}
              >
                {answer}
              </li>
            ))}
          </ul>
          {isAnswered && (
            <button onClick={handleNext}>
              {index < quizData.length - 1 ? "Next" : "Finish"}
            </button>
          )}
          <div className="index">
            {index + 1} of {quizData.length} questions
          </div>
        </>
      ) : (
        <div className="score-container">
          <div className="score-circle" style={getScoreStyle()}>
            <div className="score-text">
              <span>{score}</span> / {quizData.length}
            </div>
            <div className="emoji">{getEmoji()}</div>
          </div>
          <button onClick={handleReset} style={{height:"65px",width:"120px"}}>Reset Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
