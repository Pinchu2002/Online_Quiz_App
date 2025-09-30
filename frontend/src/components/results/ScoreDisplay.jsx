import React from 'react';

const ScoreDisplay = ({ results }) => {
  if (!results) {
    return null;
  }

  const { score, totalQuestions, correctAnswers, percentage } = results;

  // Determine performance level and color
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Excellent!', color: 'text-green-600', bgColor: 'bg-green-100', emoji: '🎉' };
    if (percentage >= 75) return { level: 'Great Job!', color: 'text-blue-600', bgColor: 'bg-blue-100', emoji: '👏' };
    if (percentage >= 60) return { level: 'Good Effort!', color: 'text-yellow-600', bgColor: 'bg-yellow-100', emoji: '👍' };
    if (percentage >= 40) return { level: 'Keep Practicing!', color: 'text-orange-600', bgColor: 'bg-orange-100', emoji: '💪' };
    return { level: 'Need More Practice', color: 'text-red-600', bgColor: 'bg-red-100', emoji: '📚' };
  };

  const performance = getPerformanceLevel(percentage);

  // Calculate progress bar width
  const progressWidth = `${percentage}%`;

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">Quiz Completed!</h2>
        <p className="text-gray-600">Here's how you performed</p>
      </div>

      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div className={`relative w-40 h-40 rounded-full ${performance.bgColor} flex items-center justify-center border-4 ${performance.color.replace('text', 'border')}`}>
          <div className="text-center">
            <div className={`text-4xl font-bold ${performance.color}`}>
              {percentage.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>
      </div>

      {/* Performance Badge */}
      <div className="mb-6 text-center">
        <span className={`inline-block px-6 py-2 text-lg font-semibold rounded-full ${performance.bgColor} ${performance.color}`}>
          {performance.emoji} {performance.level}
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 text-center bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">{correctAnswers}</div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        <div className="p-4 text-center bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">{totalQuestions - correctAnswers}</div>
          <div className="text-sm text-gray-600">Incorrect</div>
        </div>
        <div className="p-4 text-center bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">{totalQuestions}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Progress</span>
          <span>{correctAnswers} / {totalQuestions} questions</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${performance.bgColor} ${performance.color.replace('text', 'bg')} transition-all duration-500 ease-out`}
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>

      {/* Total Score */}
      <div className="pt-4 mt-6 text-center border-t border-gray-200">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Total Score:</span>{' '}
          <span className="text-2xl font-bold text-gray-900">{score}</span> points
        </p>
      </div>
    </div>
  );
};

export default ScoreDisplay;