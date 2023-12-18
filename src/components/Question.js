
// import React, { useState } from 'react';

// const Question = ({ question, options, onSelect, onNext, onBack }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     onSelect(option);
//     console.log("yoooo handle option selected here")
//     console.log("the selected option for the following question:")
//     console.log(question)
//     console.log("is : ")
//     console.log(option)
//   };

//   return (
//     <div>
//       <h2>{question}</h2>
//       <div>
//         {options.map((option, index) => (
//           <div key={index}>
//             <label>
//               <input
//                 type="radio"
//                 name="answer"
//                 value={option}
//                 onChange={() => handleOptionSelect(option)}
//               />
//               {option}
//             </label>
//           </div>
//         ))}
//       </div>
//       <button onClick={onBack}>Back</button>
//       <button onClick={onNext} disabled={!selectedOption}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default Question;

import React, { useState, useEffect } from 'react';

const Question = ({ question, options, onSelect, onNext, onBack, setSelectedOption }) => {
  const [selectedOptionLocal, setSelectedOptionLocal] = useState(null);

  useEffect(() => {
    setSelectedOption(selectedOptionLocal);
  }, [selectedOptionLocal, setSelectedOption]);

  const handleOptionSelect = (option) => {
    setSelectedOptionLocal(option);
    onSelect(option);
    console.log("yoooo handle option selected here")
    console.log("the selected option for the following question:")
    console.log(question)
    console.log("is : ")
    console.log(option)
  };

  return (
    <div>
      <h2>{question}</h2>
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                onChange={() => handleOptionSelect(option)}
                checked={selectedOptionLocal === option}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button onClick={onBack}>Back</button>
      <button onClick={onNext} disabled={!selectedOptionLocal}>
        {selectedOptionLocal}
      </button>
    </div>
  );
};

export default Question;
