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
  const navigate = useNavigate();

  const handleAnswer = (side) => {
    // side = 0 for left/yes, side = 1 for right/no
    // Here you could also handle the answer, e.g., storing it for later use
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber < questions.length) {
      setQuestionNumber(nextQuestionNumber);
    } else {
      // Redirect to the desired page when the quiz is completed
      navigate('/playback'); // Adjust this path as needed
    }
  };

  return (
    <div className="centered-div-quiz text-align-center">
	<head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>DevBops | Custom Playlists for Developers</title>
      <link rel="stylesheet" href="https://use.typekit.net/clj0cwu.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="./Quiz.css" />
      <script src="%PUBLIC_URL%/script.js" type="text/javascript"></script>
    </head>
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
