import React, { useState } from 'react';
import GameArea from './GameArea';
import LetterList from './LetterList';
import Coleccion from './Coleccion';
import './LaboratorioSilabas.css';

const consonantsLevel1 = {
  1: ['M'],
  2: ['R'],
  3: ['H']
};

const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const vowels = ['A', 'E', 'I', 'O', 'U'];

const generateSyllables = (consonants) => {
  return consonants.flatMap(c => vowels.map(v => c + v));
};

const syllablesLevel1 = {
  1: generateSyllables(consonantsLevel1[1]),
  2: generateSyllables(consonantsLevel1[2]),
  3: generateSyllables(consonantsLevel1[3])
};

const validVC = [
  'AL', 'EL', 'IL', 'OL', 'UL', 'AS', 'ES', 'IS', 'OS', 'US',
  'AP', 'EP', 'IP', 'OP', 'UP', 'AM', 'EM', 'IM', 'OM', 'UM',
  'AN', 'EN', 'IN', 'ON', 'UN', 'AD', 'ED', 'ID', 'OD', 'UD',
  'AR', 'ER', 'IR', 'OR', 'UR', 'AB', 'EB', 'IB', 'OB', 'UB'
];

const syllablesLevel2 = validVC;

const generateComplexSyllables = (consonants) => {
  return consonants.flatMap(c => vowels.flatMap(v => consonants.map(c2 => c + v + c2)));
};

const syllablesLevel3 = generateComplexSyllables(consonants);

const generateDigraphSyllables = (consonants) => {
  return consonants.flatMap(c => consonants.flatMap(c2 => vowels.map(v => c + c2 + v)));
};

const syllablesLevel4 = generateDigraphSyllables(consonants);

const levels = [
  { name: 'Nivel 1 - Sílabas simples (CV)', syllables: syllablesLevel1, img: 'img/silabas1.png' },
  { name: 'Nivel 2 - Sílabas que empiezan por vocal (VC)', syllables: syllablesLevel2, img: 'img/silabas2.png' },
  { name: 'Nivel 3 - Sílabas complejas (CVC)', syllables: syllablesLevel3, img: 'img/silabas3.png' },
  { name: 'Nivel 4 - Sílabas con dígrafos (CCV)', syllables: syllablesLevel4, img: 'img/silabas4.png' }
];

const LaboratorioSilabas = () => {
  const [formedSyllables, setFormedSyllables] = useState(levels.map(() => []));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentSubLevel, setCurrentSubLevel] = useState(1);
  const [showCollection, setShowCollection] = useState(false);

  const handleSyllableFormed = (syllable) => {
    const validSyllables = currentLevel === 0 ? levels[currentLevel].syllables[currentSubLevel] : levels[currentLevel].syllables;
    if (validSyllables.includes(syllable) && !formedSyllables[currentLevel].includes(syllable)) {
      const newFormedSyllables = [...formedSyllables];
      newFormedSyllables[currentLevel] = [...newFormedSyllables[currentLevel], syllable];
      setFormedSyllables(newFormedSyllables);

      if (currentLevel === 0) {
        const allSubLevelSyllablesFormed = levels[currentLevel].syllables[currentSubLevel].every(
          s => newFormedSyllables[currentLevel].includes(s)
        );
        if (allSubLevelSyllablesFormed) {
          if (currentSubLevel < 3) {
            setCurrentSubLevel(currentSubLevel + 1);
          } else {
            // Once all sublevels of level 1 are complete, unlock all levels
            setCurrentLevel(1);
            setCurrentSubLevel(1);
          }
        }
      } else {
        const allLevelSyllablesFormed = levels[currentLevel].syllables.every(
          s => newFormedSyllables[currentLevel].includes(s)
        );
        if (allLevelSyllablesFormed && currentLevel < 3) {
          setCurrentLevel(currentLevel + 1);
        }
      }
    }
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    setCurrentSubLevel(1);
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
                className={`nivel-img ${index <= currentLevel ? '' : 'blocked'} ${index === currentLevel ? 'selected' : ''}`}
              />
            ))}
          </div>
          <div className="game-area-container">
            <div className="current-syllable-display" onClick={toggleCollection}>
              <div className="current-syllable">
                {formedSyllables[currentLevel][formedSyllables[currentLevel].length - 1] || 'Ninguna sílaba formada'}
              </div>
            </div>
            <GameArea onSyllableFormed={handleSyllableFormed} currentLevel={currentLevel} currentSubLevel={currentSubLevel} />
            <LetterList currentLevel={currentLevel} currentSubLevel={currentSubLevel} />
          </div>
        </>
      )}
    </div>
  );
};

export default LaboratorioSilabas;
