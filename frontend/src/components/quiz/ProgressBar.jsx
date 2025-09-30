import React from 'react';
import useNavigation from '../../hooks/useNavigation';

const ProgressBar = () => {
  const { currentQuestionIndex, totalQuestions } = useNavigation();
  const progressPercentage = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;