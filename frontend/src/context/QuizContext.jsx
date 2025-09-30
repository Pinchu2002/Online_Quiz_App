import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);


  const setAnswer = (questionId, optionId) => {
    const newAnswers = new Map(userAnswers);
    newAnswers.set(questionId, optionId);
    setUserAnswers(newAnswers);
  };

  const resetQuiz = () => {
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Map());
    setIsSubmitted(false);
    setResults(null);
    setError(null);
  };

  const value = {
    quiz,
    setQuiz,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setAnswer,
    isLoading,
    setIsLoading,
    error,
    setError,
    isSubmitted,
    setIsSubmitted,
    results,
    setResults,
    resetQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
