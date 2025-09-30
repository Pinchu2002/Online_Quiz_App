import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import ScoreDisplay from '../components/results/ScoreDisplay';
import AnswerReviewCard from '../components/results/AnswerReviewCard';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const ResultsPage = () => {
  const { results, quiz, resetQuiz } = useQuiz();
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  if (!results) {
    return (
      <div className="max-w-2xl mx-auto my-8 text-center">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <p className="mb-4 text-lg text-gray-700">No results to display.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Map user answers to questions for review
  const getAnswerReview = () => {
    if (!quiz || !quiz.questions || !results.detailedAnswers) {
      return [];
    }

    return quiz.questions.map((question, index) => {
      const userAnswer = results.detailedAnswers.find(
        (answer) => answer.questionId === question.id
      );
      return {
        question,
        userAnswer,
        isCorrect: userAnswer?.isCorrect || false,
        questionNumber: index + 1,
      };
    });
  };

  const handleTakeQuizAgain = () => {
    resetQuiz();
    navigate('/quiz/1');
  };

  const answerReview = getAnswerReview();

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Score Summary */}
      <ScoreDisplay results={results} />

      {/* Review Toggle Button */}
      <div className="mt-8 text-center">
        <Button
          onClick={() => setShowReview(!showReview)}
          className="px-8 py-3 text-lg"
        >
          {showReview ? '📊 Hide Answer Review' : '🔍 View Detailed Answer Review'}
        </Button>
      </div>

      {/* Detailed Answer Review */}
      {showReview && answerReview.length > 0 && (
        <div className="mt-8">
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              📝 Answer Review
            </h3>
            <p className="text-blue-800">
              Review your answers below. Correct answers are highlighted in green,
              and incorrect answers are highlighted in red.
            </p>
          </div>

          {answerReview.map((review) => (
            <AnswerReviewCard
              key={review.question.id}
              question={review.question}
              userAnswer={review.userAnswer}
              isCorrect={review.isCorrect}
              questionNumber={review.questionNumber}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/">
          <Button className="px-6 py-3">
            🏠 Back to Home
          </Button>
        </Link>
        <Button 
          onClick={handleTakeQuizAgain}
          className="px-6 py-3 bg-green-600 hover:bg-green-700"
        >
          🔄 Take Quiz Again
        </Button>
      </div>

      {/* Performance Tips */}
      {results.percentage < 70 && (
        <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <h4 className="text-lg font-bold text-yellow-900 mb-2">
            💡 Tips to Improve
          </h4>
          <ul className="list-disc list-inside text-yellow-800 space-y-1">
            <li>Review the questions you got wrong carefully</li>
            <li>Take your time reading each question thoroughly</li>
            <li>Practice regularly to improve your knowledge</li>
            <li>Try taking the quiz again to test your improvement</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;