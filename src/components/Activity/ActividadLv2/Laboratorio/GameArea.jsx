// src/components/LaboratorioSilabas/GameArea.js
import React, { useState } from 'react';
import './GameArea.css';

const GameArea = ({ onSyllableFormed, currentLevel }) => {
  const [currentSyllable, setCurrentSyllable] = useState('');

  const handleDrop = (event) => {
    const letter = event.dataTransfer.getData('letter');
    const newSyllable = currentSyllable + letter;
    setCurrentSyllable(newSyllable);

    if ((currentLevel === 0 || currentLevel === 1) && newSyllable.length === 2) {
      onSyllableFormed(newSyllable);
      setCurrentSyllable('');
    } else if ((currentLevel === 2 || currentLevel === 3) && newSyllable.length === 3) {
      onSyllableFormed(newSyllable);
      setCurrentSyllable('');
    } else if (newSyllable.length > 3) {
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
