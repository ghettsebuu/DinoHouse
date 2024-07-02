import React, { useState, useEffect } from 'react';
import './actividadLv3.css';
import FinalScreen from '../Final.jsx';
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx'; // Importa la función guardarPuntuacion
import AudioPlayer from '../../../helpers/AudioPlayer'; 

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');
const positiveFeedbackSound = new Audio('/sounds/bien.mp3');
const AyudaFeedbackSound = new Audio('/sounds/intenta.mp3');

const Oraciones = ({ mostrarOraciones }) => {
  const [audioKey, setAudioKey] = useState('Oraciones'); // Estado para el audio actual
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0); 
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

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
        { src: "/img/Level3/pasta.png", correct: false },
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
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Oraciones') {
      const timer = setTimeout(() => {
        setAudioKey('InstruccionOraciones');
      }, 5000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

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
      correctSound.play();
      positiveFeedbackSound.play();
      setScore(score + 10); // Sumar 10 puntos por respuesta correcta
      setFeedback("¡Correcto! Buen trabajo.");
    } else {
      incorrectSound.play();
      AyudaFeedbackSound.play();
      setFeedback("No es correcto. Intenta de nuevo.");
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowFinalScreen(true);
        const codigoAcceso = localStorage.getItem('codigoAcceso');
        guardarPuntuacion(codigoAcceso, 3, score); // Guarda la puntuación en Firestore
        finalSound.play(); // Reproduce el sonido al llegar al final del juego
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
    <section className='PlayScena'>
    <div className="actividad">
    <AudioPlayer audioKey={audioKey} /> 
      {showFinalScreen ? (
        <FinalScreen score={score} onRestart={restartActivity} onGoToHome={goToHome} onNext={nextActivity} />
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
    </section>
  );
};

export default Oraciones;

