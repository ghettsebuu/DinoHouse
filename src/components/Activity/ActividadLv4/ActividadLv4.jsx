import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final';
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx';
import './ActividadLv4.css';
import AudioPlayer from '../../../helpers/AudioPlayer';

const TOTAL_ROUNDS = 5;
const CORRECT_SCORE = 20;
const INCORRECT_PENALTY = 5;

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');
const positiveFeedbackSound = new Audio('/sounds/Nivel1/bien.mp3');
const AyudaFeedbackSound = new Audio('/sounds/Nivel4/incorrect.mp3');

const ActividadLv4 = ({ mostrarActividad }) => {
  const [audioKey, setAudioKey] = useState('ActividadLv4'); // Estado para el audio actual
  const [gameOver, setGameOver] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [round, setRound] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(0);

  const paragraphs = [
    "María compró caramelos y los repartió entre todos sus amigos.",
    "El perro de Juan es muy juguetón.",
    "La maestra explicó la lección con mucha paciencia.",
    "En el bosque viven muchos animales como ciervos, conejos y pájaros."
  ];

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'ActividadLv4') {
      const timer = setTimeout(() => {
        setAudioKey('InstruccionLv4');
      }, 6000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
    if (audioKey === 'InstruccionLv4') {
      const timer = setTimeout(() => {
        setAudioKey('AyudaLv4');
      }, 7000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setCurrentParagraph(randomParagraph);

    const words = randomParagraph.split(" ");
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord.replace(/[.,]/g, "")); // Remove punctuation for comparison

    setSelectedWord(null);
    setCorrect(false);
    setGameOver(false);
    setRound(0); // Reset round counter
    setAudioPlayed(false); // Reset audio played state
    setScore(0); // Reset score
    setScoreChange(0); // Reset score change
  };

  const startNextRound = () => {
    const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setCurrentParagraph(randomParagraph);

    const words = randomParagraph.split(" ");
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord.replace(/[.,]/g, "")); // Remove punctuation for comparison

    setSelectedWord(null);
    setCorrect(false);
    setAudioPlayed(false); // Reset audio played state
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
    if (word === targetWord) {
      setCorrect(true);
      correctSound.play();
      positiveFeedbackSound.play();
      setScoreChange(CORRECT_SCORE);
      setScore(score + CORRECT_SCORE);
      if (round + 1 === TOTAL_ROUNDS) {
        setGameOver(true);
        finalSound.play(); // Reproduce el sonido final al terminar el juego
        const codigoAcceso = localStorage.getItem('codigoAcceso');
        guardarPuntuacion(codigoAcceso, 4, score + CORRECT_SCORE); // Guarda la puntuación en Firestore
      } else {
        setRound(round + 1);
        startNextRound();
      }
    } else {
      setCorrect(false);
      incorrectSound.play();
      AyudaFeedbackSound.play();
      setScoreChange(-INCORRECT_PENALTY);
      setScore(score - INCORRECT_PENALTY);
    }
  };

  const handleRestart = () => {
    startNewGame();
  };

  const handleGoToHome = () => {
    mostrarActividad(false);
  };

  const handleNext = () => {
    // Implementa la lógica para ir a la siguiente actividad si la tienes
    console.log("Next activity");
  };

  const playAudio = (word) => {
    // Retorna solo la función de reproducción, no la reproducción automática
    return () => {
      const audio = new Audio(`/audios/${word.toLowerCase()}.mp3`);
      audio.play();
    };
  };

  if (gameOver) {
    return (
      <FinalScreen
        onRestart={handleRestart}
        onGoToHome={handleGoToHome}
        onNext={handleNext}
        score={score}
      />
    );
  }

  const words = currentParagraph.split(" ");

  return (
    <section className='PlayScena'>
    <div className="actividad4">  
    <AudioPlayer audioKey={audioKey} />
      <h2>Encuentra la palabra</h2> 
      <div className='ronda'>
        {/* <p>Escucha atentamente</p> */}
        <p>Ronda: {round + 1}/{TOTAL_ROUNDS}</p>
      </div>
      
      <div className="audio-container">
        <button onClick={playAudio(targetWord)} className="audio-button">
          <i className="fa-solid fa-volume-high"></i>
        </button>
        <span className="target-word">{targetWord}</span>
      </div>
      <div className='Puntos'>
        <p>Puntaje: {score}</p>
      </div>
      <p className='parrafo'>
        {words.map((word, index) => {
          const cleanedWord = word.replace(/[.,]/g, "");
          return (
            <span
              key={index}
              onClick={() => handleWordClick(cleanedWord)}
              className={
                selectedWord === cleanedWord
                  ? cleanedWord === targetWord
                    ? "selected-correct"
                    : "selected-incorrect"
                  : ""
              }
            >
              {word} 
              {index < words.length - 1 && " "}
            </span>
          );
        })}
      </p>
      
    </div>
    </section>
  );
};

export default ActividadLv4;
