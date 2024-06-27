import React from 'react';
import './GameArea.css';

const GameArea = ({ currentSyllable }) => {
  return (
    <div className="game-area">
      <div className="current-syllable">
        {currentSyllable}
      </div>
    </div>
  );
};

export default GameArea;
