import React, { useState, useEffect } from 'react';
import GameArea from './GameArea';
import LetterList from './LetterList';
import './LaboratorioSilabas.css';
import AudioPlayer from '../../../../helpers/AudioPlayer';
import instructionGif from '/Gif/laboratorio.gif'; // Importa tu GIF

const consonantsLevel1 = {
  1: ['M', 'P', 'L', 'D', 'N', 'F', 'T'],
  2: ['R', 'B', 'V', 'G', 'J', 'C', 'S', 'Z', 'Y'],
  3: ['H', 'K', 'Ñ', 'X', 'W']
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

const generateSyllables = (consonants) => {
  return consonants.flatMap(c => vowels.map(v => c + v));
};

const syllablesLevel1 = {
  1: generateSyllables(consonantsLevel1[1]),
  2: generateSyllables(consonantsLevel1[2]),
  3: generateSyllables(consonantsLevel1[3])
};

const levels = [
  { name: 'Nivel 1 - Sílabas simples-abiertas (CV)', syllables: syllablesLevel1, img: 'img/silabas1.png', audio: 'InstruccionCV' }
];

const LaboratorioSilabas = () => {
  const [audioKey, setAudioKey] = useState('Laboratorio'); // Estado para el audio actual
  const [formedSyllables, setFormedSyllables] = useState(levels.map(() => []));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentSubLevel, setCurrentSubLevel] = useState(1);
  const [showCollection, setShowCollection] = useState(false);
  const [currentSyllable, setCurrentSyllable] = useState('');
  const [interactable, setInteractable] = useState(false);
  const [showGif, setShowGif] = useState(false);


  useEffect(() => {
    if (audioKey === 'Laboratorio') {
      setShowGif(true);
      const timer = setTimeout(() => {
        setAudioKey('InstruccionCV');
      }, 7000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  useEffect(() => {
    // Activar la interacción después de que se reproduzcan todas las instrucciones
    if (audioKey === 'InstruccionCV') {
        const timer = setTimeout(() => {
            setShowGif(false);
            setInteractable(true);
        }, 9000); // ajusta el tiempo según la duración total de las instrucciones
        return () => clearTimeout(timer);
    }
}, [audioKey]);

  const handleSyllableFormed = (syllable) => {
    if (!interactable) return;
    const validSyllables = levels[currentLevel].syllables[currentSubLevel];
    if (validSyllables.includes(syllable) && !formedSyllables[currentLevel].includes(syllable)) {
      const newFormedSyllables = [...formedSyllables];
      newFormedSyllables[currentLevel] = [...newFormedSyllables[currentLevel], syllable];
      setFormedSyllables(newFormedSyllables);

      // Reproduce el audio correspondiente a la sílaba formada
      playAudio(`/SonidosSilabas/${syllable}.mp3`);

      const allSubLevelSyllablesFormed = levels[currentLevel].syllables[currentSubLevel].every(
        s => newFormedSyllables[currentLevel].includes(s)
      );
      if (allSubLevelSyllablesFormed) {
        if (currentSubLevel < 3) {
          setCurrentSubLevel(currentSubLevel + 1);
        }
      }
    }
  };

  const handleLevelChange = (level) => {
    if (!interactable) return;
    setCurrentLevel(level);
    setCurrentSubLevel(1);
    setAudioKey(levels[level].audio); // Actualiza el audio al cambiar de nivel
  };

  const toggleCollection = () => {
    setShowCollection(!showCollection);
  };

  const handleLetterClick = (letter) => {
    if (!interactable) return;
    const newSyllable = currentSyllable + letter;
    setCurrentSyllable(newSyllable);

    if (newSyllable.length === 2) {
      handleSyllableFormed(newSyllable);
      setCurrentSyllable('');
    } else if (newSyllable.length > 2) {
      setCurrentSyllable('');
    }
  };

  return (
    <div className="laboratorio-silabas">
       {showGif && (
            <div className="overlayGif">
                   <img src={instructionGif} alt="Instruction Gif" className="instruction-gif" />
            </div>
        )}
      <audio src={`/audios/${audioKey}.mp3`} autoPlay />
      <AudioPlayer audioKey={audioKey} />
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
        <GameArea currentSyllable={currentSyllable} />
        <LetterList currentLevel={currentLevel} currentSubLevel={currentSubLevel} onLetterClick={handleLetterClick} />
      </div>
    </div>
  );
};

export default LaboratorioSilabas;
