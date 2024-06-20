import React, { useState } from 'react';
import './GameArea.css';

const GameArea = ({ onSyllableFormed, currentLevel, currentSubLevel }) => {
  const [currentSyllable, setCurrentSyllable] = useState('');

  const handleDrop = (event) => {
    const letter = event.dataTransfer.getData('letter');
    const newSyllable = currentSyllable + letter;
    setCurrentSyllable(newSyllable);

    let syllableLength = 2;
    if (currentLevel === 2 || currentLevel === 3) {
      syllableLength = 3;
    }

    if (newSyllable.length === syllableLength) {
      onSyllableFormed(newSyllable);
      setCurrentSyllable('');
    } else if (newSyllable.length > syllableLength) {
      setCurrentSyllable('');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="game-area" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="current-syllable">
        {currentSyllable}
      </div>
    </div>
  );
};

export default GameArea;
