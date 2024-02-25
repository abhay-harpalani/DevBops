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
    const updatedAnswers = [...quizAnswers, side];
    setQuizAnswers(updatedAnswers);

    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber < questions.length) {
      setQuestionNumber(nextQuestionNumber);
    } else {
      // Log the quiz results before navigating away
      console.log("Quiz Results:", updatedAnswers);
      // each array documenting, ideating, coding
      var instrumentalness_min = [];
      var instrumentalness_max = [];
      var loudness_min = [];
      var loudness_max = [];
      // yes left = 0, no right = 1
      for (let i = 0; i < 3; i++) {
        if (updatedAnswers[i] == 0) { // yes
          instrumentalness_min.push(0.5);
          instrumentalness_max.push(1);
        } else {
          instrumentalness_min.push(0);
          instrumentalness_max.push(0.5);
        }

        if (updatedAnswers[i+3] == 0) { // yes
          loudness_min.push(0.5);
          loudness_max.push(1);
        } else {
          loudness_min.push(0);
          loudness_max.push(0.5);
        }
      }
      console.log("instrumentalness min documenting: ", instrumentalness_min[0])
      console.log("instrumentalness min ideating: ", instrumentalness_min[1])
      console.log("instrumentalness min coding: ", instrumentalness_min[2])
      console.log("instrumentalness max documenting: ", instrumentalness_max[0])
      console.log("instrumentalness max ideating: ", instrumentalness_max[1])
      console.log("instrumentalness max coding: ", instrumentalness_max[2])
      console.log("loudness min documenting: ", instrumentalness_min[0])
      console.log("loudness min ideating: ", instrumentalness_min[1])
      console.log("loudness min coding: ", instrumentalness_min[2])
      console.log("loudness max documenting: ", instrumentalness_max[0])
      console.log("loudness max ideating: ", instrumentalness_max[1])
      console.log("loudness max coding: ", instrumentalness_max[2])
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
