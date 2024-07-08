import React from 'react';
import './LetterList.css';

const consonantsLevel1 = {
  1: ['M', 'P', 'L', 'D', 'N', 'F', 'T'],
  2: ['R', 'B', 'V', 'G', 'J', 'C','S', 'Z', 'Y'],
  3: ['H', 'K', 'Ñ', 'X', 'W']
};

const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const vowels = ['A', 'E', 'I', 'O', 'U'];

const Alfabeto = [...vowels, ...consonants];

const letters = {
  1: {
    1: ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'L', 'D', 'N', 'F', 'T'],
    2: ['A', 'E', 'I', 'O', 'U', 'R', 'B', 'V', 'G', 'J', 'C', 'Q', 'S', 'Z', 'Y'],
    3: ['A', 'E', 'I', 'O', 'U', 'H', 'K', 'Ñ', 'X', 'W']
  },
  2: ['A', 'E', 'I', 'O', 'U', 'L', 'S', 'P', 'M', 'N', 'D', 'R', 'B', 'G', 'J', 'C', 'Q', 'V', 'F', 'K', 'W', 'X', 'Z', 'Ñ'],
  3: Alfabeto,
  4: Alfabeto
};

const LetterList = ({ currentLevel, currentSubLevel, onLetterClick }) => {
  const availableLetters = currentLevel === 0 ? letters[1][currentSubLevel] : letters[currentLevel + 1];

  return (
    <div className="letter-list">
      {availableLetters.map((letter) => (
        <div
          key={letter}
          className="letter"
          onClick={() => onLetterClick(letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default LetterList;
