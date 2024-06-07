// src/components/Activity/LaboratorioSilabas/LaboratorioSilabas.jsx
import React, { useState } from 'react';
import GameArea from './GameArea';
import LetterList from './LetterList';
import './LaboratorioSilabas.css';

const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const vowels = ['A', 'E', 'I', 'O', 'U'];

const validVC = ['AL', 'AR', 'EL', 'EN', 'ER', 'IL', 'IM', 'IN', 'IR', 'OL', 'OR', 'UL', 'UR'];

const syllablesLevel1 = consonants.flatMap(c => vowels.map(v => c + v));
const syllablesLevel2 = validVC;
const syllablesLevel3 = consonants.flatMap(c => vowels.flatMap(v => consonants.map(c2 => c + v + c2)));
const syllablesLevel4 = consonants.flatMap(c => consonants.flatMap(c2 => vowels.map(v => c + c2 + v)));

const levels = [
  { name: 'Nivel 1 - Sílabas simples (CV)', syllables: syllablesLevel1 },
  { name: 'Nivel 2 - Sílabas que empiezan por vocal (VC)', syllables: syllablesLevel2 },
  { name: 'Nivel 3 - Sílabas complejas (CVC)', syllables: syllablesLevel3 },
  { name: 'Nivel 4 - Sílabas con dígrafos (CCV)', syllables: syllablesLevel4 }
];

const LaboratorioSilabas = () => {
  const [formedSyllables, setFormedSyllables] = useState(levels.map(() => []));
  const [currentLevel, setCurrentLevel] = useState(0);

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

  return (
    <div className="laboratorio-silabas">
      <h2>Laboratorio de Sílabas y Sonidos</h2>
      <h3>{levels[currentLevel].name}</h3>
      <div className="nivel-selector">
        {levels.map((level, index) => (
          <button key={index} onClick={() => handleLevelChange(index)} disabled={index === currentLevel}>
            {level.name}
          </button>
        ))}
      </div>
      <div className="coleccion">
        <h3>Mi colección</h3>
        {formedSyllables[currentLevel].length === 0 ? (
          <p>No has descubierto ninguna sílaba aún.</p>
        ) : (
          <ul>
            {formedSyllables[currentLevel].map((syllable, index) => (
              <li key={index}>{syllable}</li>
            ))}
          </ul>
        )}
      </div>
      <GameArea onSyllableFormed={handleSyllableFormed} currentLevel={currentLevel} />
      <LetterList />
    </div>
  );
};

export default LaboratorioSilabas;
