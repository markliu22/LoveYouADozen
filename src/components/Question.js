// src/components/Question.js
import React from 'react';

const Question = ({ question, options, onSelect }) => {
  return (
    <div>
      <h1>{question}</h1>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => onSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
