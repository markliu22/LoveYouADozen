// import React from 'react';

// const Summary = ({ answers, bouquetImagePath }) => {
//   console.log('Answers:', answers);

//   return (
//     <div>
//       <h2>Summary</h2>
//       {/* Render other summary information */}
//       {bouquetImagePath && (
//         <div>
//           <img src={bouquetImagePath} alt="Final Bouquet" />
//           <p>Other summary details...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Summary;

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
          {/* Download link */}
          <a href={bouquetImagePath} download="BouquetImage.png" style={{ display: 'block', marginTop: '10px' }}>
            Download Bouquet Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Summary;
