import React, { useState } from "react";
import "./quizsetting.css";
const QuizSettings = ({ onStartQuiz }) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState(9); // Default category is General Knowledge
  const [difficulty, setDifficulty] = useState("medium");

  const handleStartQuiz = () => {
    onStartQuiz(numQuestions, category, difficulty);
  };

  return (
    <div className="settings-container">
      <h2>Quiz Settings</h2>
      <hr />
      <div className="setting">
        <label htmlFor="numQuestions">
          <b>Number of Questions:</b>
        </label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          min="1"
          max="50"
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      <div className="setting">
        <label htmlFor="category">
          <b>Category:</b>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
        </select>
      </div>

      <div className="setting">
        <label htmlFor="difficulty">
          <b>Difficulty:</b>
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizSettings;
