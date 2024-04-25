import React from 'react';

function Spinner() {
  return (
    <div className="Spinner container mx-auto my-32 bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "auto", background: "rgb(247, 250, 252) none repeat scroll 0% 0%", display: "block", shapeRendering: "auto"}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#9f7aea" stroke-width="5" r="25" stroke-dasharray="117.80972450961724 41.269908169872416">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </svg>
    </div>
  );
}

export default Spinner;
