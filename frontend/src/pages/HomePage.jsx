import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the Quiz App</h1>
      <p className="mt-4">Select a quiz to start.</p>
      <div className="mt-8">
        <Link to="/quiz/1">
          <Button>JavaScript Basics</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
