import React from 'react';
import Button from '../common/Button';

const QuizStart = ({ onStart, quiz }) => (
  <div>
    <h1>{quiz.title}</h1>
    <p>{quiz.description}</p>
    <Button onClick={onStart}>Start Quiz</Button>
  </div>
);

export default QuizStart;