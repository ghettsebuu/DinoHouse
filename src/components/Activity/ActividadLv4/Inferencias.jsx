import React, { useState, useEffect } from 'react';
import './Inferencias.css';
import FinalScreen from '../Final';
import AudioPlayer from '../../../helpers/AudioPlayer';
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx';
import instructionGif from '/Gif/Adivinanzas.gif'; // Importa tu GIF

const questions = [
  {
    id: 1,
    image: '/img/Adivinanzas/adivina.png',
    text: 'Soy un vehículo espacial que lleva a los astronautas a la Luna. ¿Quién soy?',
    options: [
      { id: 1, image: '/img/Adivinanzas/cohete.png', correct: true },
      { id: 2, image: '/img/Adivinanzas/avion.png', correct: false },
      { id: 3, image: '/img/Adivinanzas/carro.png', correct: false }
    ]
  },
  {
    id: 2,
    image: '/img/Adivinanzas/adivina.png',
    text: 'Soy un ser de otro planeta, con ojos grandes y piel verde. ¿Quién soy?',
    options: [
      { id: 1, image: '/img/Adivinanzas/dinosaurio.png', correct: false },
      { id: 2, image: '/img/Adivinanzas/dragon.png', correct: false },
      { id: 3, image: '/img/Adivinanzas/alien.png', correct: true }
    ]
  },
  {
    id: 3,
    image: '/img/Adivinanzas/adivina.png',
    text: 'Soy el planeta azul, el hogar de millones de seres vivos. ¿Quién soy?',
    options: [
      { id: 1, image: '/img/Adivinanzas/martes.png', correct: false },
      { id: 2, image: '/img/Adivinanzas/tierra.png', correct: true },
      { id: 3, image: '/img/Adivinanzas/saturno.png', correct: false }
    ]
  },
  {
    id: 4,
    image: '/img/Adivinanzas/adivina.png',
    text: 'Soy alguien que viaja al espacio para explorar y descubrir nuevos lugares. ¿Quién soy?',
    options: [
      { id: 1, image: '/img/Adivinanzas/astronauta.png', correct: true },
      { id: 2, image: '/img/Adivinanzas/piloto.png', correct: false },
      { id: 3, image: '/img/Adivinanzas/albañil.png', correct: false }
    ]
  },
  {
    id: 5,
    image: '/img/Adivinanzas/adivina.png',
    text: 'Soy el satélite natural de la Tierra, brillando en el cielo nocturno. ¿Quién soy?',
    options: [
      { id: 1, image: '/img/Adivinanzas/satelite.png', correct: false },
      { id: 2, image: '/img/Adivinanzas/meteorito.png', correct: false },
      { id: 3, image: '/img/Adivinanzas/luna.png', correct: true }
    ]
  },
];

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');
const positiveFeedbackSound = new Audio('/sounds/Nivel1/bien.mp3');
const ayudaFeedbackSound = new Audio('/sounds/Nivel4/adiviIncorrect.mp3');

const JuegoInferencias = () => {
  const [audioKey, setAudioKey] = useState('Adivinanzas'); // Estado para el audio actual
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [retryAvailable, setRetryAvailable] = useState(false); // Estado para controlar si está disponible el reintentar
  const [interactable, setInteractable] = useState(false); // Estado para controlar la interacción
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Adivinanzas') {
      setShowGif(true);
      const timer = setTimeout(() => {
        setAudioKey('InstruccionAdivinanzas');
      }, 6000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

  useEffect(() => {
    // Activar la interacción después de que se reproduzcan todas las instrucciones
    if (audioKey === 'InstruccionAdivinanzas') {
        const timer = setTimeout(() => {
            setShowGif(false);
            setInteractable(true);
        }, 4000); // ajusta el tiempo según la duración total de las instrucciones
        return () => clearTimeout(timer);
    }
}, [audioKey]);

  const handleOptionClick = (option) => {
    if (!interactable) return; // Evitar interacción si no es interactuable
    if (option.correct) {
      correctSound.play();
      positiveFeedbackSound.play();
      setScore(score + 20);

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setRetryAvailable(false); // Reiniciar la oportunidad de reintentar
      } else {
        setShowResult(true);
        finalSound.play(); // Reproduce el sonido final al terminar el juego
        const codigoAcceso = localStorage.getItem('codigoAcceso');
        guardarPuntuacion(codigoAcceso, 4, score ); // Guarda la puntuación en Firestore
      }
    } else {
      incorrectSound.play();
      ayudaFeedbackSound.play();
      setRetryAvailable(true); // Habilitar la opción de reintentar
    }
  };

  const handleRetry = () => {
    setRetryAvailable(false); // Deshabilitar la opción de reintentar
  };



  return (
    <div className="juego-inferencias">
      {showGif && (
            <div className="overlayGif">
                   <img src={instructionGif} alt="Instruction Gif" className="instruction-gif" />
            </div>
        )}
      <AudioPlayer audioKey={audioKey} />
      <h2>Adivinanzas</h2>
      {showResult ? (
        <FinalScreen
          score={score}
          
        />
      ) : (
        <div className="question-card">
          <img className="adivina" src={questions[currentQuestion].image} alt="Question" />
          <p className="adivinanza">{questions[currentQuestion].text}</p>
          <div className="optionsI">
            {questions[currentQuestion].options.map((option) => (
              <img
                key={option.id}
                src={option.image}
                alt="Option"
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </div>
          {retryAvailable && (
            <button onClick={handleRetry}>Intenta de nuevo</button>
          )}
        </div>
      )}
    </div>
  );
};

export default JuegoInferencias;
