import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Question from './components/Question';
import Summary from './components/Summary';

const Home = () => {
  return (
    <div>
      <h1>TODO: title here</h1>
      <p>TODO: prompt to start here</p>
      <Link to="/question1">
        <button>Start</button>
      </Link>
    </div>
  );
};

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (questionNumber, selectedOption) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionNumber - 1] = selectedOption;
      return updatedAnswers;
    });

    setIsAnswerSelected(true);
    console.log("YOOOO handle select ran !!");
  };

  const handleNext = (questionNumber) => {
    console.log("handle next called");
    if (questionNumber === 3 && isAnswerSelected) {
      navigate('/summary');
    } else {
      if (isAnswerSelected) {
        setSelectedOption(null);
        navigate(`/question${questionNumber + 1}`);
        setIsAnswerSelected(false);
        console.log("just reset is answer selected for the next question");
      }
    }
  };

  const handleBack = (questionNumber) => {
    if (questionNumber === 1) {
      // Do nothing, as you can't go back from the first question
    } else {
      if (isAnswerSelected) {
        navigate(`/question${questionNumber - 1}`);
      } else {
        navigate(`/question${questionNumber - 1}`);
        setIsAnswerSelected(true); // Set to true only if an answer was selected before
      }
    }
  };
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        key="question1"
        path="/question1"
        element={<Question
          question="What is the capital of France?"
          options={['Berlin', 'Madrid', 'Paris', 'Rome']}
          onSelect={(selectedOption) => handleSelect(1, selectedOption)}
          onNext={() => handleNext(1)}
          onBack={() => handleBack(1)}
          setSelectedOption={setSelectedOption}
        />}
      />
      <Route
        key="question2"
        path="/question2"
        element={<Question
          question="Which programming language is best?"
          options={['Python', 'JavaScript', 'Java', 'Ruby']}
          onSelect={(selectedOption) => handleSelect(2, selectedOption)}
          onNext={() => handleNext(2)}
          onBack={() => handleBack(2)}
          setSelectedOption={setSelectedOption}
        />}
      />
      <Route
        key="question3"
        path="/question3"
        element={<Question
          question="What is the largest planet in our solar system?"
          options={['Mars', 'Venus', 'Jupiter', 'Saturn']}
          onSelect={(selectedOption) => handleSelect(3, selectedOption)}
          onNext={() => handleNext(3)}
          onBack={() => handleBack(3)}
          setSelectedOption={setSelectedOption}
        />}
      />
      <Route path="/summary" element={<Summary answers={answers} />} />
    </Routes>
  );
};

export default App;
