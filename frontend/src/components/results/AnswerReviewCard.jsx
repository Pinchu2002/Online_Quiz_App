import React from 'react';

const AnswerReviewCard = ({ question, userAnswer, isCorrect, questionNumber }) => {
  return (
    <div className={`p-6 mb-4 rounded-lg shadow-md border-2 ${
      isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
    }`}>
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="px-3 py-1 mr-3 text-sm font-semibold text-white bg-gray-700 rounded-full">
              Q{questionNumber}
            </span>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              isCorrect 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {question.text}
          </h3>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isUserAnswer = userAnswer?.selectedOptionId === option.id;
          const isCorrectAnswer = question.correctOptionId === option.id;
          
          let optionStyle = 'bg-white border-gray-300';
          let iconStyle = '';
          let icon = null;

          if (isCorrectAnswer) {
            optionStyle = 'bg-green-100 border-green-500 border-2';
            iconStyle = 'text-green-600';
            icon = '✓';
          } else if (isUserAnswer && !isCorrect) {
            optionStyle = 'bg-red-100 border-red-500 border-2';
            iconStyle = 'text-red-600';
            icon = '✗';
          }

          return (
            <div
              key={option.id}
              className={`p-4 border rounded-lg ${optionStyle} transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800">{option.text}</span>
                {icon && (
                  <span className={`text-xl font-bold ${iconStyle}`}>
                    {icon}
                  </span>
                )}
              </div>
              
              {/* Labels */}
              <div className="flex gap-2 mt-2">
                {isCorrectAnswer && (
                  <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-200 rounded">
                    Correct Answer
                  </span>
                )}
                {isUserAnswer && (
                  <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-200 rounded">
                    Your Answer
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation Section (if available) */}
      {question.explanation && (
        <div className="p-4 mt-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h4 className="mb-2 text-sm font-semibold text-blue-900">
            💡 Explanation
          </h4>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}

      {/* Points Information */}
      <div className="mt-4 text-sm text-gray-600">
        <span className="font-semibold">Points: </span>
        {isCorrect ? question.points : 0} / {question.points}
      </div>
    </div>
  );
};

export default AnswerReviewCard;
