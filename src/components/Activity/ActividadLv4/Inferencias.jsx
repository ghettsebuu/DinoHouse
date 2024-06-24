import React, { useState } from 'react';
import './Inferencias.css';
import FinalScreen from '../Final';

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
      { id: 1, image:'/img/Adivinanzas/alien.png', correct: true },
      { id: 2, image: '/img/Adivinanzas/dinosaurio.png', correct: false },
      { id: 3, image: '/img/Adivinanzas/dragon.png', correct: false }
    ]
  },
  {
    id: 3,
    image: '/img/Adivinanzas/adivina.png',
    text: 'Soy el planeta azul, el hogar de millones de seres vivos. ¿Quién soy?',
    options: [
      { id: 1, image: '/img/Adivinanzas/tierra.png', correct: true },
      { id: 2, image: '/img/Adivinanzas/martes.png', correct: false },
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
      { id: 1, image: '/img/Adivinanzas/luna.png', correct: true },
      { id: 2, image: '/img/Adivinanzas/satelite.png', correct: false },
      { id: 3, image: '/img/Adivinanzas/meteorito.png', correct: false }
    ]
  },
        
];

const JuegoInferencias = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    if (option.correct) {
      setScore(score + 20);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="juego-inferencias">
      <h2>Adivinanzas</h2>
      {showResult ? (
        <FinalScreen
          score={score}
          onRestart={handleRestart}
          // Implementa las funciones para onGoToHome y onNext según sea necesario
        />
      ) : (
        <div className="question-card">
            <img  className ='adivina' src={questions[currentQuestion].image} alt="Question" />
            <p className='adivinanza'>{questions[currentQuestion].text}</p>
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
        </div>
      )}
    </div>
  );
};

export default JuegoInferencias;
