import React from 'react';
import useNavigation from '../../hooks/useNavigation';
import Button from '../common/Button';

const NavigationButtons = ({ onSubmit }) => {
  const {
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useNavigation();

  return (
    <div className="flex justify-between mt-8">
      <Button onClick={prevQuestion} disabled={isFirstQuestion}>
        Previous
      </Button>
      {isLastQuestion ? (
        <Button onClick={onSubmit} className="bg-green-500 hover:bg-green-700">
          Submit
        </Button>
      ) : (
        <Button onClick={nextQuestion}>
          Next
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;