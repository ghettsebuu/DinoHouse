import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final'; // Importamos el componente FinalScreen
import './ActividadLv4.css'; // Asegúrate de importar el archivo CSS

const TOTAL_ROUNDS = 5;

const ActividadLv4 = ({ mostrarActividad }) => {
  const [gameOver, setGameOver] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [round, setRound] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const paragraphs = [
    "María compró caramelos y los repartió entre todos sus amigos.",
    "El perro de Juan es muy juguetón y le encanta correr en el parque.",
    "La maestra explicó la lección con mucha paciencia y todos los niños entendieron.",
    "En el bosque viven muchos animales como ciervos, ardillas y pájaros.",
    "Ayer fuimos al cine y vimos una película muy divertida."
  ];

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
      if (round + 1 === TOTAL_ROUNDS) {
        setGameOver(true);
      } else {
        setRound(round + 1);
        startNextRound();
      }
    } else {
      setCorrect(false);
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
    const audio = new Audio(`./audios/${word.toLowerCase()}.mp3`);
    audio.onended = () => {
      setAudioPlayed(true); // Mark audio as played once it ends
    };
    audio.play();
  };

  if (gameOver && correct) {
    return (
      <FinalScreen
        onRestart={handleRestart}
        onGoToHome={handleGoToHome}
        onNext={handleNext}
      />
    );
  }

  const words = currentParagraph.split(" ");

  return (
    <div className="actividad4">  
      <h2>Encuentra la palabra</h2> 
      <p>Escucha atentamente </p>
      <div className="audio-container">
        <button onClick={() => playAudio(targetWord)} className="audio-button">
          <i className="fa-solid fa-volume-high"></i>
        </button>
        <span className="target-word">{targetWord}</span>
      </div>
      <p>Ronda: {round + 1}/{TOTAL_ROUNDS}</p>
      <p>
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
            </span>
          );
        })}
      </p>
      
    </div>
  );
};

export default ActividadLv4;
