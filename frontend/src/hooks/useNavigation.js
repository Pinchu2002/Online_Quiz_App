import { useQuiz } from '../context/QuizContext';

const useNavigation = () => {
  const { currentQuestionIndex, setCurrentQuestionIndex, quiz } = useQuiz();

  const nextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = quiz ? currentQuestionIndex === quiz.questions.length - 1 : false;

  return {
    nextQuestion,
    prevQuestion,
    currentQuestionIndex,
    isFirstQuestion,
    isLastQuestion,
    totalQuestions: quiz ? quiz.questions.length : 0,
  };
};

export default useNavigation;
