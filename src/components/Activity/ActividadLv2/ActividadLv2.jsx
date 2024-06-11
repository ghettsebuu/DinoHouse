import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from "immutability-helper";
import "./ActividadLv2.css";

const ItemTypes = {
  LETTER: "letter",
};

const Letter = ({ letter, index }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.LETTER,
    item: { letter, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={ref} className="letter" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {letter}
    </div>
  );
};

const LetterSlot = ({ letter, index, moveLetter, currentWord, word }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.LETTER,
    drop: (item) => {
      moveLetter(item.index, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isCorrect = currentWord[index] === word[index];
  const slotStyle = currentWord[index]
    ? isCorrect
      ? "letter-slot correct"
      : "letter-slot incorrect"
    : "letter-slot";

  return (
    <div ref={drop} className={slotStyle}>
      {letter}
    </div>
  );
};

const ActividadLv2 = () => {
  const rounds = [
    { word: "CASA", image: "/img/ObjetosLv1/Casa.png" },
    { word: "PELOTA", image: "/img/ObjetosLv1/Pelota.png" },
    { word: "GATO", image: "/img/ObjetosLv1/Gato.png" },
    { word: "BOTAS", image: "/img/ObjetosLv1/Botas.png" },
    { word: "DELFIN", image: "/img/ObjetosLv1/Delfin.png" },
    { word: "JIRAFA", image: "/img/ObjetosLv1/Jirafa.png" }
  ];

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [isWordCorrect, setIsWordCorrect] = useState(false);
  const currentRound = rounds[currentRoundIndex];

  useEffect(() => {
    const shuffledLetters = currentRound.word.split("").sort(() => 0.5 - Math.random());
    setLetters(shuffledLetters);
    setCurrentWord(new Array(currentRound.word.length).fill(null));
    setIsWordCorrect(false); // Reset isWordCorrect when moving to the next round
  }, [currentRoundIndex]);

  const moveLetter = (fromIndex, toIndex) => {
    const letterToMove = letters[fromIndex];
    if (currentWord[toIndex]) {
      const newLetters = update(letters, {
        $splice: [
          [fromIndex, 1, currentWord[toIndex]],
        ],
      });
      const newCurrentWord = update(currentWord, {
        [toIndex]: { $set: letterToMove },
      });
      setLetters(newLetters);
      setCurrentWord(newCurrentWord);
    } else {
      const newCurrentWord = update(currentWord, {
        [toIndex]: { $set: letterToMove },
      });
      const newLetters = update(letters, {
        [fromIndex]: { $set: "" },
      });
      setCurrentWord(newCurrentWord);
      setLetters(newLetters);
    }
  };

  const removeLetter = (index) => {
    const letterToRemove = currentWord[index];
    const newCurrentWord = update(currentWord, {
      [index]: { $set: null },
    });
    const newLetters = update(letters, {
      $push: [letterToRemove],
    });
    setCurrentWord(newCurrentWord);
    setLetters(newLetters.filter(Boolean));
  };

  useEffect(() => {
    const allFilled = currentWord.every(letter => letter !== null);
    if (allFilled) {
      const allCorrect = currentWord.every((letter, index) => letter === currentRound.word[index]);
      setIsWordCorrect(allCorrect);
    } else {
      setIsWordCorrect(false);
    }
  }, [currentWord]);

  const handleNextRound = () => {
    if (currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    } else {
      alert("¡Felicidades! Has completado todas las rondas.");
    }
  };

  return (
    <div className="actividad-lv2">
      <h2>Forma la palabra</h2>
      <img src={currentRound.image} alt={currentRound.word} className="image" />
      <div className="target">
        {currentWord.map((letter, index) => (
          <div
            key={index}
            className="letter-container"
            onClick={() => removeLetter(index)}
          >
            <LetterSlot
              key={index}
              index={index}
              letter={letter}
              moveLetter={moveLetter}
              currentWord={currentWord}
              word={currentRound.word}
            />
          </div>
        ))}
      </div>
      <div className="letters">
        {letters.map((letter, index) => (
          letter && <Letter key={index} index={index} letter={letter} />
        ))}
      </div>
      {isWordCorrect && (
        <button onClick={handleNextRound}>Siguiente palabra</button>
      )}
    </div>
  );
};

export default () => (
  <DndProvider backend={HTML5Backend}>
    <ActividadLv2 />
  </DndProvider>
);
