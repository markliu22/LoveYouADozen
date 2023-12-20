import React from 'react';

const Summary = ({ answers, bouquetImagePath }) => {
  console.log('Answers:', answers);

  return (
    <div>
      <h2>Summary</h2>
      {/* Render other summary information */}
      {bouquetImagePath && (
        <div>
          <img src={bouquetImagePath} alt="Final Bouquet" />
          <p>Other summary details...</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
