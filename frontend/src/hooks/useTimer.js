import { useState, useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';

const useTimer = (timeLimit, onTimeout) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const { isSubmitted } = useQuiz();
  const timerRef = useRef();

  useEffect(() => {
    if (isSubmitted) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isSubmitted, onTimeout]);

  return timeRemaining;
};

export default useTimer;
