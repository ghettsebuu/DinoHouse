import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final';
import './recetas.css';
import AudioPlayer from '../../../helpers/AudioPlayer'; 
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx'; // Importa la función guardarPuntuacion
import instructionGif from '/Gif/recetas.gif'; // Importa tu GIF

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');
const positiveFeedbackSound = new Audio('/sounds/Nivel1/bien.mp3');
const AyudaFeedbackSound = new Audio('/sounds/Nivel3/recetaIncorrect.mp3');

const recetas = [ 
  {
    nombre: 'Galletas de Chocolate',
    descripcion: 'Para hacer galletas de chocolate, necesitas: primero harina, luego azúcar, después leche y por último huevos.',
    ingredientes: [
      { nombre: 'harina', src: '/img/recetas/harina.png' },
      { nombre: 'azucar', src: '/img/recetas/azucar.png' },
      { nombre: 'leche', src: '/img/recetas/leche.png' },
      { nombre: 'huevos', src: '/img/recetas/huevos.png' },
    ],
    orden: ['harina', 'azucar', 'leche', 'huevos'],
  },
  {
    nombre: 'Panqueques',
    descripcion: 'Para hacer panqueques, necesitas: primero harina, luego huevos, después leche y por último mantequilla.',
    ingredientes: [
      { nombre: 'harina', src: '/img/recetas/harina.png' },
      { nombre: 'huevos', src: '/img/recetas/huevos.png' },
      { nombre: 'leche', src: '/img/recetas/leche.png' },
      { nombre: 'mantequilla', src: '/img/recetas/mantequilla.png' },
    ],
    orden: ['harina', 'huevos', 'leche', 'mantequilla'],
  },
  {
    nombre: 'Pastel de Vainilla',
    descripcion: 'Para hacer pastel de vainilla, necesitas: primero harina, luego azúcar, después huevos y por último vainilla.',
    ingredientes: [
      { nombre: 'harina', src: '/img/recetas/harina.png' },
      { nombre: 'azucar', src: '/img/recetas/azucar.png' },
      { nombre: 'huevos', src: '/img/recetas/huevos.png' },
      { nombre: 'vainilla', src: '/img/recetas/vainilla.png' },
    ],
    orden: ['harina', 'azucar', 'huevos', 'vainilla'],
  },
];

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ActividadLv3 = ({ mostrarActividad }) => {
  const [ronda, setRonda] = useState(0);
  const [audioKey, setAudioKey] = useState('Recetas'); // Estado para el audio actual
  const [arrastrados, setArrastrados] = useState([]);
  const [actividadCompletada, setActividadCompletada] = useState(false);
  const [score, setScore] = useState(0); // Añadido: estado de puntuación
  const recetaActual = recetas[ronda];
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState(shuffleArray(recetaActual.ingredientes));
  const [tazonColor, setTazonColor] = useState('');
  const [interactable, setInteractable] = useState(false); // Estado para controlar la interacción
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Recetas') {
      setShowGif(true);
      const timer = setTimeout(() => {
        setAudioKey('InstruccionRecetas');
      }, 2000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  }, [audioKey]);

  useEffect(() => {
    setIngredientesDisponibles(shuffleArray(recetaActual.ingredientes));
  }, [ronda]);

  useEffect(() => {
    // Activar la interacción después de que se reproduzcan todas las instrucciones
    if (audioKey === 'InstruccionRecetas') {
        const timer = setTimeout(() => {
          setShowGif(false);
            setInteractable(true);
        }, 4000); // ajusta el tiempo según la duración total de las instrucciones
        return () => clearTimeout(timer);
    }
}, [audioKey]);

  const handleIngredientClick = (ingrediente) => {
    if (!interactable) return; // Evitar interacción si no es interactuable
    if (arrastrados.length < recetaActual.orden.length) {
      const nuevosArrastrados = [...arrastrados, ingrediente];
      setArrastrados(nuevosArrastrados);
      setIngredientesDisponibles(ingredientesDisponibles.filter((ing) => ing.nombre !== ingrediente.nombre));
      setAudioKey(ingrediente.nombre); // Reproducir el audio del ingrediente
      verificarOrden(nuevosArrastrados);
    }
  };

  const handleRemove = (index) => {

    const ingredienteRemovido = arrastrados[index];
    const nuevosArrastrados = arrastrados.filter((_, i) => i !== index);
    setArrastrados(nuevosArrastrados);
    setIngredientesDisponibles([...ingredientesDisponibles, ingredienteRemovido]);
    verificarOrden(nuevosArrastrados);
  };

  const reiniciarActividad = () => {
    setArrastrados([]);
    setTazonColor('');
    setIngredientesDisponibles(shuffleArray(recetaActual.ingredientes));
    
    
  };

 
  const siguienteActividad = () => {
    if (ronda < recetas.length - 1) {
      setRonda(ronda + 1);
      reiniciarActividad();
    } else {
      handleFinishGame();
    }
  };

  const verificarOrden = (nuevosArrastrados) => {
    let correcto = true;
    nuevosArrastrados.forEach((ingrediente, index) => {
      if (ingrediente.nombre !== recetaActual.orden[index]) {
        correcto = false;
      }
    });
    if (correcto && nuevosArrastrados.length === recetaActual.orden.length) {
      correctSound.play();
      positiveFeedbackSound.play();
      setTazonColor('correcto');
      setScore((prevScore) => prevScore + 50); // Añadido: sumar puntos por receta correcta
      setTimeout(siguienteActividad, 1000);
    } else if (correcto) {
      setTazonColor('correcto-parcial');
    } else {
      incorrectSound.play();
      AyudaFeedbackSound.play();
      setTazonColor('incorrecto');
      setScore((prevScore) => prevScore - 10); // Añadido: restar puntos por ingrediente incorrecto
    }
  };

  const handleFinishGame = () => {
    finalSound.play();
    const codigoAcceso = localStorage.getItem('codigoAcceso');
    guardarPuntuacion(codigoAcceso, 3, score); // Guarda la puntuación en Firestore
    setActividadCompletada(true);
  };

  const handleClickTazon = () => {
    if (!interactable) return; // Evitar interacción si no es interactuable
    reiniciarActividad();
  };

  return (
    <div className="actividad3">
      {showGif && (
            <div className="overlayGif">
                   <img src={instructionGif} alt="Instruction Gif" className="instruction-gif" />
            </div>
        )}
      <AudioPlayer audioKey={audioKey} /> 
      <h2>Recetas de Cocina</h2>
      <div className="score">Puntuación: {score}</div> {/* Añadido: mostrar la puntuación */}
      {actividadCompletada ? (
        <FinalScreen
          score={score} // Añadido: pasar puntuación a la pantalla final
          
        />
      ) : (
        <>
          <div className='receta'>
            <h3>{recetaActual.nombre}</h3>
            <p>{recetaActual.descripcion}</p>
          </div>
          
          <div className="ingredientes">
            {ingredientesDisponibles.map((ingrediente) => (
              <img
                key={ingrediente.nombre}
                src={ingrediente.src}
                alt={ingrediente.nombre}
                onClick={() => handleIngredientClick(ingrediente)}
              />
            ))}
          </div>
          <div
            className={`tazon ${tazonColor}`}
            onClick={handleClickTazon}
          >
            <img src="/img/recetas/tazon.png" alt="Tazón" />
            <div className="ingredientes-en-tazon">
              {arrastrados.map((ingrediente, index) => (
                <div key={index} className="ingrediente-en-tazon" onClick={() => handleRemove(index)}>
                  <img src={ingrediente.src} alt={ingrediente.nombre} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActividadLv3;
