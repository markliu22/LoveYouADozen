// src/components/Summary.js
import React from 'react';

const Summary = ({ answers }) => {
  return (
    <div>
      <h1>Answers Summary</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            Question {index + 1}: {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
