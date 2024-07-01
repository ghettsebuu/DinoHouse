import React, { useState, useEffect } from 'react';
import GameArea from './GameArea';
import LetterList from './LetterList';
import Coleccion from './Coleccion';
import './LaboratorioSilabas.css';
import AudioPlayer from '../../../../helpers/AudioPlayer'; 

const consonantsLevel1 = {
  1: ['M', 'P', 'L', 'D', 'N', 'F', 'T'],
  2: ['R', 'B', 'V', 'G', 'J', 'C', 'Q', 'S', 'Z', 'Y'],
  3: ['H', 'K', 'Ñ', 'X', 'W']
};

const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const vowels = ['A', 'E', 'I', 'O', 'U'];

const generateSyllables = (consonants) => {
  return consonants.flatMap(c => vowels.map(v => c + v));
};

const validVC = [
  'AL', 'EL', 'IL', 'OL', 'UL', 'AS', 'ES', 'IS', 'OS', 'US',
  'AP', 'EP', 'IP', 'OP', 'UP', 'AM', 'EM', 'IM', 'OM', 'UM',
  'AN', 'EN', 'IN', 'ON', 'UN', 'AD', 'ED', 'ID', 'OD', 'UD',
  'AR', 'ER', 'IR', 'OR', 'UR', 'AB', 'EB', 'IB', 'OB', 'UB'
];

const generateComplexSyllables = (consonants) => {
  return consonants.flatMap(c => vowels.flatMap(v => consonants.map(c2 => c + v + c2)));
};

const generateDigraphSyllables = (consonants) => {
  const validDigraphs = ['CH', 'LL', 'RR', 'BR', 'CR', 'DR', 'FR', 'GR', 'PR', 'TR', 'BL', 'CL', 'FL', 'GL', 'PL', 'TL'];
  return validDigraphs.flatMap(c => vowels.map(v => c + v));
};

const syllablesLevel1 = {
  1: generateSyllables(consonantsLevel1[1]),
  2: generateSyllables(consonantsLevel1[2]),
  3: generateSyllables(consonantsLevel1[3])
};

const syllablesLevel2 = validVC;
const syllablesLevel3 = generateComplexSyllables(consonants);
const syllablesLevel4 = generateDigraphSyllables(consonants);

const levels = [
  { name: 'Nivel 1 - Sílabas simples-abiertas (CV)', syllables: syllablesLevel1, img: 'img/silabas1.png', audio: 'InstruccionCV' },
  { name: 'Nivel 2 - Sílabas Inversas-cerradas (VC)', syllables: syllablesLevel2, img: 'img/silabas2.png', audio: 'InstruccionVC' },
  { name: 'Nivel 3 - Sílabas compuestas-cerradas(CVC)', syllables: syllablesLevel3, img: 'img/silabas3.png', audio: 'InstruccionCVC' },
  { name: 'Nivel 4 - Sílabas con compuestas-abiertas (CCV)', syllables: syllablesLevel4, img: 'img/silabas4.png', audio: 'InstruccionCCV' }
];

const LaboratorioSilabas = () => {
  const [audioKey, setAudioKey] = useState('Laboratorio'); // Estado para el audio actual
  const [formedSyllables, setFormedSyllables] = useState(levels.map(() => []));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentSubLevel, setCurrentSubLevel] = useState(1);
  const [showCollection, setShowCollection] = useState(false);
  const [currentSyllable, setCurrentSyllable] = useState('');

  useEffect(() => {
    if (audioKey === 'Laboratorio') {
      const timer = setTimeout(() => {
        setAudioKey('InstruccionCV');
      }, 7000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

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
    setAudioKey(levels[level].audio); // Actualiza el audio al cambiar de nivel
  };

  const toggleCollection = () => {
    setShowCollection(!showCollection);
  };

  const handleLetterClick = (letter) => {
    const newSyllable = currentSyllable + letter;
    setCurrentSyllable(newSyllable);

    let syllableLength = 2;
    if (currentLevel === 2 || currentLevel === 3) {
      syllableLength = 3;
    }

    if (newSyllable.length === syllableLength) {
      handleSyllableFormed(newSyllable);
      setCurrentSyllable('');
    } else if (newSyllable.length > syllableLength) {
      setCurrentSyllable('');
    }
  };

  return (
    <div className="laboratorio-silabas">
      <AudioPlayer audioKey={audioKey} /> 
    {/*   {showCollection ? (
        <Coleccion formedSyllables={formedSyllables} currentLevel={currentLevel} onBack={toggleCollection} />
      ) : ( */}
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
            <GameArea currentSyllable={currentSyllable} />
            <LetterList currentLevel={currentLevel} currentSubLevel={currentSubLevel} onLetterClick={handleLetterClick} />
          </div>
        </>
     {/*  )}  */}
    </div>
  );
};

export default LaboratorioSilabas;
