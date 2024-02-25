import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const questions = [
  "Do you like songs with or without lyrics for documenting?",
  "Do you like songs with or without lyrics for testing?",
  "Do you like songs with or without lyrics for coding?",
  "Do you like listening to loud music when documenting?",
  "Do you like listening to loud music when testing?",
  "Do you like listening to loud music when coding?"
];

const answers = [
  ["With", "Without"], // 0 for With: 0.5 - 1.0, 1 for Without: 0 - 0.5
  ["With", "Without"],
  ["With", "Without"],
  ["Yes", "No"], // 0 for Yes: loudness >= -7.5, 1 for No: loudness <= -7.5
  ["Yes", "No"],
  ["Yes", "No"]
];

const Quiz = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quizResults, setQuizResults] = useState({instrumentalness: [], loudness: []});
  const navigate = useNavigate();

  const handleAnswer = (side) => {
    // Interpret the answer for instrumentalness or loudness
    let value;
    if (questionNumber < 3) { // First 3 questions for instrumentalness
      value = side === 0 ? [0.5, 1.0] : [0, 0.5];
      setQuizResults(prevResults => ({
        ...prevResults,
        instrumentalness: [...prevResults.instrumentalness, ...value]
      }));
    } else { // Next 3 questions for loudness
      value = side === 0 ? [0.5, 1] : [0, 0.5]; // Assuming -30 as a lower bound for "No"
      setQuizResults(prevResults => ({
        ...prevResults,
        loudness: [...prevResults.loudness, value[0]]
      }));
    }

    // Navigate or move to the next question
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber < questions.length) {
      setQuestionNumber(nextQuestionNumber);
    } else {
      // Calculate averages and log results
      const avgInstrumentalness = quizResults.instrumentalness.reduce((a, b) => a + b, 0) / quizResults.instrumentalness.length;
      const avgLoudness = quizResults.loudness.reduce((a, b) => a + b, 0) / quizResults.loudness.length;
      console.log(`Average Instrumentalness: ${avgInstrumentalness}`);
      console.log(`Average Loudness: ${avgLoudness}`);
      navigate('/playback');
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

