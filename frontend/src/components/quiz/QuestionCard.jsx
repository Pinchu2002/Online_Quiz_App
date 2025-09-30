import React from 'react';

const QuestionCard = ({ question, selectedOption, onSelectOption }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{question.text}</h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map(option => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            className={`p-4 text-left border rounded-lg ${
              selectedOption === option.id
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;