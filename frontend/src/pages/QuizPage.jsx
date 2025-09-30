import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { fetchQuiz, submitQuiz } from '../services/quiz.service';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import QuestionCard from '../components/quiz/QuestionCard';
import NavigationButtons from '../components/quiz/NavigationButtons';
import ProgressBar from '../components/quiz/ProgressBar';
import Timer from '../components/quiz/Timer';

const QuizPage = () => {
  const { quizId } = useParams();
  const {
    quiz,
    setQuiz,
    currentQuestionIndex,
    userAnswers,
    setAnswer,
    isLoading,
    setIsLoading,
    error,
    setError,
    isSubmitted,
    setIsSubmitted,
    setResults,
    resetQuiz,
  } = useQuiz();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        // Reset quiz state when loading a new quiz
        resetQuiz();
        setIsLoading(true);
        const response = await fetchQuiz(quizId);
        setQuiz(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]); // Only depend on quizId to avoid infinite loops

  const handleSubmitQuiz = async () => {
    try {
        setIsLoading(true);
        const answers = Array.from(userAnswers, ([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }));
        const result = await submitQuiz(quiz.id, answers);
        setResults(result.data);
        setIsSubmitted(true);
    } catch (err) {
        setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleTimeout = () => {
    // Auto-submit when timer runs out
    if (!isSubmitted) {
      handleSubmitQuiz();
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!quiz) return null;

  if (isSubmitted) {
    return <Navigate to="/results" />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      {/* Timer - only show if quiz has a time limit */}
      {quiz.time_limit && (
        <div className="mb-4">
          <Timer timeLimit={quiz.time_limit} onTimeout={handleTimeout} />
        </div>
      )}

      {/* Progress Bar */}
      <ProgressBar />

      {/* Quiz Content */}
      <div className="p-8 mt-4 bg-white rounded-lg shadow-lg">
        <QuestionCard
          question={currentQuestion}
          selectedOption={userAnswers.get(currentQuestion.id)}
          onSelectOption={(optionId) => setAnswer(currentQuestion.id, optionId)}
        />
        <NavigationButtons onSubmit={handleSubmitQuiz} />
      </div>
    </div>
  );
};

export default QuizPage;