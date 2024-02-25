import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const questions = [
  "Do you like songs with or without lyrics for documenting?",
  "Do you like songs with or without lyrics for ideating?",
  "Do you like songs with or without lyrics for coding?",
  "Do you like listening to loud music when documenting?",
  "Do you like listening to loud music when ideating?",
  "Do you like listening to loud music when coding?"
];

const answers = [
  ["With", "Without"],
  ["With", "Without"],
  ["With", "Without"],
  ["Yes", "No"],
  ["Yes", "No"],
  ["Yes", "No"]
];

const Quiz = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]); // State to store answers
  const navigate = useNavigate();

  const handleAnswer = (side) => {
    // Update quizAnswers with the selected answer
    const updatedAnswers = [...quizAnswers, answers[questionNumber][side]];
    setQuizAnswers(updatedAnswers);

    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber < questions.length) {
      setQuestionNumber(nextQuestionNumber);
    } else {
      // Log the quiz results before navigating away
      console.log("Quiz Results:", updatedAnswers);
      navigate('/playback'); // Adjust this path as needed
    }
  };

  return (
    <div className="centered-div-quiz text-align-center">
      <div className="joly-regular font-large">
        <h1>DevBops</h1>
      </div>
      <div className="joly-thin font-medium">
        <p id="quiz-question">{questions[questionNumber]}</p>
      </div>
      <div className="quiz-buttons">
        <button onClick={() => handleAnswer(0)} className="quiz-button">{answers[questionNumber][0]}</button>
        <button onClick={() => handleAnswer(1)} className="quiz-button">{answers[questionNumber][1]}</button>
      </div>
    </div>
  );
};

export default Quiz;
