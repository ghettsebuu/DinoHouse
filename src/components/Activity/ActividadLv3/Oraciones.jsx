import React, { useState, useEffect } from 'react';
import './actividadLv3.css';
import FinalScreen from '../Final.jsx';

const Oraciones = ({ mostrarOraciones }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showFinalScreen, setShowFinalScreen] = useState(false);  // Nuevo estado para FinalScreen

  const originalQuestions = [
    {
      sentence: "El gato juega con la pelota.",
      options: [
        { src: "/img/Level3/gato-pelota.png", correct: true },
        { src: "/img/Level3/perro-pelota.png", correct: false },
        { src: "/img/Level3/pelota.png", correct: false },
      ],
    },
    {
      sentence: "La sopa esta caliente.",
      options: [
        { src: "/img/Level3/Olla-caliente.png", correct: false },
        { src: "/img/Level3/sopa.png", correct: true },
        { src: "/img/Level3/abuela.png", correct: false },
      ],
    },
    {
      sentence: "El gato duerme en el sofá.",
      options: [
        { src: "/img/Level3/perro-sofa.png", correct: false },
        { src: "/img/Level3/gato-alfombra.png", correct: false },
        { src: "/img/Level3/gato-sofa.png", correct: true }
      ],
    },
    {
      sentence: "La niña come arroz.",
      options: [
        { src: "/img/Level3/niña-arroz.png", correct: true },
        { src: "/img/Level3/niño-pan.png", correct: false },
        { src: "/img/Level3/niña-pan.png", correct: false },
      ],
    },
    {
      sentence: "Luis tiene una bicicleta azul.",
      options: [
        { src: "/img/Level3/bicicleta.png", correct: false },
        { src: "/img/Level3/pepe.png", correct: false },
        { src: "/img/Level3/luis-bicicleta.png", correct: true }
      ],
    },
  ];

  useEffect(() => {
    const shuffledQuestions = originalQuestions.map(question => ({
      ...question,
      options: shuffleArray(question.options),
    }));
    setQuestions(shuffleArray(shuffledQuestions));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("¡Correcto! Buen trabajo.");
    } else {
      setFeedback("No es correcto. Intenta de nuevo.");
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowFinalScreen(true);  // Mostrar la pantalla final
      }
    }, 2000);
  };

  const restartActivity = () => {
    setShowFinalScreen(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuestions(shuffleArray(originalQuestions.map(question => ({
      ...question,
      options: shuffleArray(question.options),
    }))));
  };

  const goToHome = () => {
    mostrarOraciones(false);
  };

  const nextActivity = () => {
    // Lógica para ir a la siguiente actividad
  };

  return (
    <div className="actividad">
      {showFinalScreen ? (
        <FinalScreen onRestart={restartActivity} onGoToHome={goToHome} onNext={nextActivity} />
      ) : (
        <>
          <h2 className='tituloActividad'>Oraciones</h2>
          {questions.length > 0 && (
            <>
              <p className='parrafoActividad'>{questions[currentQuestion].sentence}</p>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <img
                    key={index}
                    src={option.src}
                    alt={`Option ${index + 1}`}
                    onClick={() => handleOptionClick(option.correct)}
                    className="option-image"
                    style={{ cursor: 'pointer', width: '150px', margin: '10px' }}
                  />
                ))}
              </div>
              {showFeedback && <p>{feedback}</p>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Oraciones;
