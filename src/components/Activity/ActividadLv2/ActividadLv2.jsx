import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import "./ActividadLv2.css";
import FinalScreen from "../Final";
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx';
import AudioPlayer from '../../../helpers/AudioPlayer';

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');
const positiveFeedbackSound = new Audio('/sounds/Nivel1/bien.mp3');
const AyudaFeedbackSound = new Audio('/sounds/Nivel2/palabraincorrect.mp3');

const ActividadLv2 = () => {
  const rounds = [
    { word: "CASA", image: "/img/ObjetosLv1/Casa.png", audio: 'casa' },
    { word: "PELOTA", image: "/img/ObjetosLv1/Pelota.png", audio: 'pelota' },
    { word: "GATO", image: "/img/ObjetosLv1/Gato.png", audio: 'gato' },
    { word: "BOTAS", image: "/img/ObjetosLv1/Botas.png", audio: 'botas' },
    { word: "DELFIN", image: "/img/ObjetosLv1/Delfin.png", audio: 'delfin' },
    { word: "JIRAFA", image: "/img/ObjetosLv1/Jirafa.png", audio: 'jirafa' },
    { word: 'TORO', image: '/img/ObjetosLv1/Toro.png', audio: 'toro' },
    { word: 'KARATE', image: '/img/ObjetosLv1/Karate.png', audio: 'karate' },
    { word: 'OLLA', image: '/img/ObjetosLv1/Olla.png', audio: 'olla' },
    { word: 'LEON', image: '/img/ObjetosLv1/Leon.png', audio: 'leon' }
  ];

  const [audioKey, setAudioKey] = useState('ActividadLv2'); // Estado para el audio actual
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
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'ActividadLv2') {
      const timer = setTimeout(() => {
        setAudioKey('InstruccionLv2');
      }, 5000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

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
      incorrectSound.play();
      AyudaFeedbackSound.play();
    } else {
      correctSound.play();
      positiveFeedbackSound.play();
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
      finalSound.play();
      const codigoAcceso = localStorage.getItem('codigoAcceso');
      guardarPuntuacion(codigoAcceso, 2, score); // Guarda la puntuación en Firestore
    }
  };

  const handleClickObjeto = (audio) => {
    setAudioKey(audio); // Reproducir audio del objeto seleccionado
  };

  return (
    <section className='PlayScena'>
      <div className="actividad-lv2">
        <AudioPlayer audioKey={audioKey} />
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
            <img src={currentRound.image} alt={currentRound.word} className="image" onClick={() => handleClickObjeto(currentRound.audio)} />
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
