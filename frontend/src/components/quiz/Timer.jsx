import React from 'react';
import useTimer from '../../hooks/useTimer';

const Timer = ({ timeLimit, onTimeout }) => {
  const timeRemaining = useTimer(timeLimit, onTimeout);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Calculate percentage remaining
  const percentageRemaining = (timeRemaining / timeLimit) * 100;

  // Determine color based on time remaining
  const getTimerColor = () => {
    if (percentageRemaining > 50) {
      return 'bg-green-500 text-white border-green-600';
    } else if (percentageRemaining > 25) {
      return 'bg-yellow-500 text-white border-yellow-600';
    } else {
      return 'bg-red-500 text-white border-red-600 animate-pulse';
    }
  };

  // Get warning icon
  const getIcon = () => {
    if (percentageRemaining > 50) return '⏱️';
    if (percentageRemaining > 25) return '⚠️';
    return '🚨';
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg border-2 transition-all duration-300 ${getTimerColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getIcon()}</span>
          <div>
            <p className="text-sm font-semibold opacity-90">Time Remaining</p>
            <p className="text-3xl font-bold tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        </div>
        
        {/* Progress Circle */}
        <div className="relative w-16 h-16">
          <svg className="transform -rotate-90 w-16 h-16">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="opacity-30"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentageRemaining / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold">{Math.round(percentageRemaining)}%</span>
          </div>
        </div>
      </div>

      {/* Warning Messages */}
      {percentageRemaining <= 25 && percentageRemaining > 0 && (
        <div className="mt-3 pt-3 border-t border-white border-opacity-30">
          <p className="text-sm font-semibold animate-pulse">
            ⚡ Hurry up! Time is running out!
          </p>
        </div>
      )}
    </div>
  );
};

export default Timer;