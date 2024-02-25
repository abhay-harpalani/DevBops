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
<<<<<<< HEAD
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
=======
  const [quizAnswers, setQuizAnswers] = useState([]); // State to store answers
  const navigate = useNavigate();

  const handleAnswer = (side) => {
    // Update quizAnswers with the selected answer
    const updatedAnswers = [...quizAnswers, side];
    setQuizAnswers(updatedAnswers);

>>>>>>> 47ec1c8e40312bcb28d41401d8dd193d1cba5a31
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber < questions.length) {
      setQuestionNumber(nextQuestionNumber);
    } else {
<<<<<<< HEAD
      // Calculate averages and log results
      const avgInstrumentalness = quizResults.instrumentalness.reduce((a, b) => a + b, 0) / quizResults.instrumentalness.length;
      const avgLoudness = quizResults.loudness.reduce((a, b) => a + b, 0) / quizResults.loudness.length;
      console.log(`Average Instrumentalness: ${avgInstrumentalness}`);
      console.log(`Average Loudness: ${avgLoudness}`);
      navigate('/playback');
=======
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
>>>>>>> 47ec1c8e40312bcb28d41401d8dd193d1cba5a31
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

