import React, { useState } from 'react';
import GameArea from './GameArea';
import LetterList from './LetterList';
import Coleccion from './Coleccion';
import './LaboratorioSilabas.css';

const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const vowels = ['A', 'E', 'I', 'O', 'U'];

const validVC = ['AL', 'AR', 'EL', 'EN', 'ER', 'IL', 'IM', 'IN', 'IR', 'OL', 'OR', 'UL', 'UR'];

const syllablesLevel1 = consonants.flatMap(c => vowels.map(v => c + v));
const syllablesLevel2 = validVC;
const syllablesLevel3 = consonants.flatMap(c => vowels.flatMap(v => consonants.map(c2 => c + v + c2)));
const syllablesLevel4 = consonants.flatMap(c => consonants.flatMap(c2 => vowels.map(v => c + c2 + v)));

const levels = [
  { name: 'Nivel 1 - Sílabas simples (CV)', syllables: syllablesLevel1, img: 'img/silabas1.png' },
  { name: 'Nivel 2 - Sílabas que empiezan por vocal (VC)', syllables: syllablesLevel2, img: 'img/silabas2.png' },
  { name: 'Nivel 3 - Sílabas complejas (CVC)', syllables: syllablesLevel3, img: 'img/silabas3.png' },
  { name: 'Nivel 4 - Sílabas con dígrafos (CCV)', syllables: syllablesLevel4, img: 'img/silabas4.png' }
];

const LaboratorioSilabas = () => {
  const [formedSyllables, setFormedSyllables] = useState(levels.map(() => []));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showCollection, setShowCollection] = useState(false);

  const handleSyllableFormed = (syllable) => {
    const validSyllables = levels[currentLevel].syllables;
    if (validSyllables.includes(syllable) && !formedSyllables[currentLevel].includes(syllable)) {
      const newFormedSyllables = [...formedSyllables];
      newFormedSyllables[currentLevel] = [...newFormedSyllables[currentLevel], syllable];
      setFormedSyllables(newFormedSyllables);
    }
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
  };

  const toggleCollection = () => {
    setShowCollection(!showCollection);
  };

  return (
    <div className="laboratorio-silabas">
      {showCollection ? (
        <Coleccion formedSyllables={formedSyllables} currentLevel={currentLevel} onBack={toggleCollection} />
      ) : (
        <>
          <div className="nivel-selector">
            {levels.map((level, index) => (
              <img 
                key={index}
                src={level.img} 
                alt={level.name} 
                onClick={() => handleLevelChange(index)} 
                className={`nivel-img ${index === currentLevel ? 'selected' : ''}`}
              />
            ))}
          </div>
          <div className="game-area-container">
            <div className="current-syllable-display" onClick={toggleCollection}>
              <div className="current-syllable">
                {formedSyllables[currentLevel][formedSyllables[currentLevel].length - 1] || 'Ninguna sílaba formada'}
              </div>
            </div>
            <GameArea onSyllableFormed={handleSyllableFormed} currentLevel={currentLevel} />
            <LetterList />
          </div>
        </>
      )}
    </div>
  );
};

export default LaboratorioSilabas;
