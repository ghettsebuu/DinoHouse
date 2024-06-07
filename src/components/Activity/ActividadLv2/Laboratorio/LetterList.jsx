import React from 'react';
import './LetterList.css';

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
  'N','Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const LetterList = () => {
  const handleDragStart = (event, letter) => {
    event.dataTransfer.setData('letter', letter);
  };

  return (
    <div className="letter-list">
      {letters.map((letter) => (
        <div
          key={letter}
          className="letter"
          draggable
          onDragStart={(event) => handleDragStart(event, letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default LetterList;
