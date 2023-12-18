// import logo from './logo.svg';
// import './App.css';

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Question from './components/Question';
import Summary from './components/Summary'; // Add this import
// import Question1 from './pages/Question1';
// import Question2 from './pages/Question2';
// import Question3 from './pages/Question3';
// import Question4 from './pages/Question4';
// import Question5 from './pages/Question5';
// import Question6 from './pages/Question6';
// import Question7 from './pages/Question7';
// import Question8 from './pages/Question8';
// import Question9 from './pages/Question9';
// import Question10 from './pages/Question10';
// import Question11 from './pages/Question11';
// import Question12 from './pages/Question12';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <p>Click the button below to start the test.</p>
      <Link to="/question1">
        <button>Start Test</button>
      </Link>
    </div>
  );
};

const App = () => {
  const [answers, setAnswers] = useState([]);

  const handleSelect = (questionNumber, selectedOption) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionNumber - 1] = selectedOption;
      return updatedAnswers;
    });

    if (questionNumber === 12) {
      window.location.href = '/summary';
    } else {
      window.location.href = `/question${questionNumber + 1}`;
    }
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/question1"
          element={<Question question="What is the capital of France?" options={['Berlin', 'Madrid', 'Paris', 'Rome']} onSelect={(selectedOption) => handleSelect(1, selectedOption)} />}
        />
        <Route
          path="/question2"
          element={<Question question="Which programming language is used for React development?" options={['Python', 'JavaScript', 'Java', 'Ruby']} onSelect={(selectedOption) => handleSelect(2, selectedOption)} />}
        />
        {/* Repeat for other questions */}
        <Route path="/summary" element={<Summary answers={answers} />} />
      </Routes>
    </Router>
  );
};

export default App;
