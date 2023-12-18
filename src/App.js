import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Question from './components/Question';
import Summary from './components/Summary';

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
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Add this line
  const navigate = useNavigate();

  const handleSelect = (questionNumber, selectedOption) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionNumber - 1] = selectedOption;
      return updatedAnswers;
    });

    // Set isAnswerSelected to true when an answer is selected
    setIsAnswerSelected(true);

    console.log("YOOOO handle select ran !!")
  };

  const handleNext = (questionNumber) => {
    console.log("handle next called")
    if (questionNumber === 2) {
      navigate('/summary');
    } else {
      // Only navigate to the next question if an answer is selected
      if (isAnswerSelected) {
        setSelectedOption(null); // Reset selected option
        navigate(`/question${questionNumber + 1}`);
        // Reset isAnswerSelected for the next question
        setIsAnswerSelected(false);
        console.log("just reset is answer selected for the next question")
      }
    }
  };
  
  

  const handleBack = (questionNumber) => {
    if (questionNumber === 1) {
    } else {
      navigate(`/question${questionNumber - 1}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
  key="question1"
  path="/question1"
  element={<Question question="What is the capital of France?" options={['Berlin', 'Madrid', 'Paris', 'Rome']} onSelect={(selectedOption) => handleSelect(1, selectedOption)} onNext={() => handleNext(1)} onBack={() => handleBack(1)} setSelectedOption={setSelectedOption} />}
/>
<Route
  key="question2"
  path="/question2"
  element={<Question question="Which programming language is best?" options={['Python', 'JavaScript', 'Java', 'Ruby']} onSelect={(selectedOption) => handleSelect(2, selectedOption)} onNext={() => handleNext(2)} onBack={() => handleBack(2)} setSelectedOption={setSelectedOption} />}
/>

      <Route path="/summary" element={<Summary answers={answers} />} />
    </Routes>
  );
};

export default App;
