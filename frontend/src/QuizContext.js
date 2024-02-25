// QuizContext.js
import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuizResults = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizResults, setQuizResults] = useState({ instrumentalness: 0, loudness: 0 });

  return (
    <QuizContext.Provider value={{ quizResults, setQuizResults }}>
      {children}
    </QuizContext.Provider>
  );
};
