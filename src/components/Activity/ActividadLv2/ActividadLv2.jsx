import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import "./ActividadLv2.css";
import FinalScreen from "../Final";
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx';

const ActividadLv2 = () => {
  const rounds = [
    { word: "CASA", image: "/img/ObjetosLv1/Casa.png" },
    { word: "PELOTA", image: "/img/ObjetosLv1/Pelota.png" },
    { word: "GATO", image: "/img/ObjetosLv1/Gato.png" },
    { word: "BOTAS", image: "/img/ObjetosLv1/Botas.png" },
    { word: "DELFIN", image: "/img/ObjetosLv1/Delfin.png" },
    { word: "JIRAFA", image: "/img/ObjetosLv1/Jirafa.png" },
    { word: 'TORO', image: '/img/ObjetosLv1/Toro.png' },
    { word: 'KARATE', image: '/img/ObjetosLv1/Karate.png' },
    { word: 'OLLA', image: '/img/ObjetosLv1/Olla.png' },
    { word: 'LEON', image: '/img/ObjetosLv1/Leon.png' }
  ];

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [isWordCorrect, setIsWordCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreUpdated, setScoreUpdated] = useState(false);

  const currentRound = rounds[currentRoundIndex];

  useEffect(() => {
    const shuffledLetters = currentRound.word.split("").sort(() => 0.5 - Math.random());
    setLetters(shuffledLetters);
    setCurrentWord(new Array(currentRound.word.length).fill(null));
    setIsWordCorrect(false);
    setAttempts(0);
    setScoreUpdated(false);
  }, [currentRoundIndex]);

  const moveLetter = (letter, toIndex) => {
    const fromIndex = letters.indexOf(letter);
    const newCurrentWord = update(currentWord, {
      [toIndex]: { $set: letter },
    });
    const newLetters = update(letters, {
      [fromIndex]: { $set: null },
    });
    setCurrentWord(newCurrentWord);
    setLetters(newLetters);

    if (currentRound.word[toIndex] !== letter) {
      setAttempts(attempts + 1);
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

  useEffect(() => {
    if (isWordCorrect && !scoreUpdated) {
      const roundScore = Math.max(10 - attempts, 0);
      setScore(score + roundScore);
      setScoreUpdated(true);
    }
  }, [isWordCorrect, score, attempts, scoreUpdated]);

  const handleNextRound = () => {
    if (currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    } else {
      setGameComplete(true);
      const codigoAcceso = localStorage.getItem('studentCodigoAcceso');
      guardarPuntuacion(codigoAcceso, 2, score); // Guarda la puntuación en Firestore
    }
  };

  return (
    <section className='PlayScena'>
      <div className="actividad-lv2">
        {gameComplete ? (
          <FinalScreen
            score={score}
            onRestart={() => {
              setGameComplete(false);
              setCurrentRoundIndex(0);
              setScore(0);
            }}
            onGoToHome={() => {
              // Lógica para ir a la pantalla de inicio, si es necesario
            }}
            onNext={() => {
              // Lógica para ir a la siguiente actividad, si es necesario
            }}
          />
        ) : (
          <>
            <h2>Forma la palabra</h2>
            <img src={currentRound.image} alt={currentRound.word} className="image" />
            <div className="target">
              {currentWord.map((letter, index) => {
                const isCorrect = letter === currentRound.word[index];
                const slotStyle = letter
                  ? isCorrect
                    ? "letter-slot correct"
                    : "letter-slot incorrect"
                  : "letter-slot";
                
                return (
                  <div
                    key={index}
                    className="letter-container"
                    onClick={() => removeLetter(index)}
                  >
                    <div className={slotStyle}>
                      {letter}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="letters">
              {letters.map((letter, index) => (
                letter && (
                  <div
                    key={index}
                    className="letter"
                    onClick={() => moveLetter(letter, currentWord.indexOf(null))}
                  >
                    {letter}
                  </div>
                )
              ))}
            </div>
            {isWordCorrect && (
              <button onClick={handleNextRound}>Siguiente palabra</button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ActividadLv2;
