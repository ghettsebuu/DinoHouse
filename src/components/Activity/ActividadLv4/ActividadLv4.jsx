import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final';
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx';
import './ActividadLv4.css';
import AudioPlayer from '../../../helpers/AudioPlayer';

const TOTAL_ROUNDS = 5;
const CORRECT_SCORE = 20;
const INCORRECT_PENALTY = 5;

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
      }, 5000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
    if (audioKey === 'InstruccionLv4') {
      const timer = setTimeout(() => {
        setAudioKey('AyudaLv4');
      }, 5000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (targetWord && !audioPlayed) {
      playAudio(targetWord);
    }
  }, [targetWord]);

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
      setScoreChange(CORRECT_SCORE);
      setScore(score + CORRECT_SCORE);
      if (round + 1 === TOTAL_ROUNDS) {
        setGameOver(true);
        const codigoAcceso = localStorage.getItem('codigoAcceso');
        guardarPuntuacion(codigoAcceso, 4, score + CORRECT_SCORE); // Guarda la puntuación en Firestore
      } else {
        setRound(round + 1);
        startNextRound();
      }
    } else {
      setCorrect(false);
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
    const audio = new Audio(`/audios/${word.toLowerCase()}.mp3`);
    audio.onended = () => {
      setAudioPlayed(true); // Mark audio as played once it ends
    };
    audio.play();
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
        <p>Escucha atentamente</p>
        <p>Ronda: {round + 1}/{TOTAL_ROUNDS}</p>
      </div>
      
      <div className="audio-container">
        <button onClick={() => playAudio(targetWord)} className="audio-button">
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
