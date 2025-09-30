import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">
      <p className="font-bold">Error</p>
      <p>{error.message || 'An unexpected error occurred.'}</p>
    </div>
  );
};

export default ErrorMessage;
