import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final';
import './Atrapa.css';
import AudioPlayer from '../../../helpers/AudioPlayer'; 
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx'; // Importa la función guardarPuntuacion
import instructionGif from '/Gif/atrapa.gif'; // Importa tu GIF


const frutas = ['Naranja', 'Sandia', 'Banana', 'Manzana', 'Mango', 'Guayaba', 'Fresa', 'Pera'];

const getRandomFruta = () => frutas[Math.floor(Math.random() * frutas.length)];
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');

const Atrapa = () => {
  const [juegoEnPausa, setJuegoEnPausa] = useState(true);
  const [audioKey, setAudioKey] = useState('Fruta'); // Estado para el audio actual
  const [frutaObjetivo, setFrutaObjetivo] = useState(getRandomFruta());
  const [puntos, setPuntos] = useState(0);
  const [mensaje, setMensaje] = useState(''); 
  const [ronda, setRonda] = useState(1);
  const [frutasAleatorias, setFrutasAleatorias] = useState(shuffleArray([...frutas]));
  const [cambios, setCambios] = useState(0);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const intervalosPorRonda = [10000, 9500, 8000];

  const DURACION_INSTRUCCIONES = 10000; 

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Fruta') {
      setShowGif(true);
      setJuegoEnPausa(true); // Pausar el juego mientras suenan las instrucciones
  
      const timer = setTimeout(() => {
        setAudioKey('InstruccionFruta');
      }, 3000); // Ajusta el tiempo según la duración del audio de bienvenida
      
      return () => clearTimeout(timer);
    } else if (audioKey === 'InstruccionFruta') {
      // Una vez que termina de sonar 'InstruccionFruta', reanudar el juego
      const timer = setTimeout(() => {
        setShowGif(false);
        setJuegoEnPausa(false); // Reanudar el juego después de las instrucciones
      }, DURACION_INSTRUCCIONES); // Reemplaza DURACION_INSTRUCCIONES con la duración real del audio 'InstruccionFruta'
      
      return () => clearTimeout(timer);
    }
  }, [audioKey]);
  
  

  useEffect(() => {
    const cambiarFrutaYReordenar = () => {
      setFrutaObjetivo(getRandomFruta());
      setFrutasAleatorias(shuffleArray([...frutas]));
      setCambios((prev) => prev + 1);
    };

    const timer = setInterval(cambiarFrutaYReordenar, intervalosPorRonda[ronda - 1]);

    return () => clearInterval(timer);
  }, [ronda]);

  useEffect(() => {
    if (cambios === 5) {
      if (ronda < 3) {
        setRonda(ronda + 1);
        setCambios(0);
      } else {
        finalSound.play(); // Reproducir el sonido final cuando termine el juego
        const codigoAcceso = localStorage.getItem('codigoAcceso');
        guardarPuntuacion(codigoAcceso, 3, puntos); // Guarda la puntuación en Firestore
        setShowFinalScreen(true);
      }
    }
  }, [cambios, ronda]);

  const atraparFruta = (fruta) => {
    if (fruta === frutaObjetivo) {
      correctSound.play(); // Reproducir sonido correcto
      setPuntos(puntos + 10);
      setMensaje('¡Correcto!');
    } else {
      incorrectSound.play(); // Reproducir sonido incorrecto
      setPuntos(puntos > 0 ? puntos - 5 : 0);
      setMensaje('Incorrecto. Pierdes 5 puntos.');
    }

    setFrutaObjetivo(getRandomFruta());
    setFrutasAleatorias(shuffleArray([...frutas]));
    setCambios((prev) => prev + 1);
  };



  if (showFinalScreen) {
    return <FinalScreen score={puntos} />;
  }

  return (
    <div className="Atrapa">
       {showGif && (
            <div className="overlayGif">
                   <img src={instructionGif} alt="Instruction Gif" className="instruction-gif" />
            </div>
        )}
      <AudioPlayer audioKey={audioKey} /> 
      <h2>Atrapa la fruta</h2>
      <div className="tablero">
        <p>Ronda: {ronda}/3</p>
        <p><strong>{frutaObjetivo}</strong></p>
        <p>Puntos: {puntos}</p>
      </div>
     
      <div className="frutas">
      {frutasAleatorias.map((fruta, index) => (
        <button key={index} onClick={() => atraparFruta(fruta)} disabled={juegoEnPausa}>
          <img src={`/img/Frutas/${fruta}.png`} alt={fruta} className="fruta-img" />
        </button>
      ))}
      </div>
      <p>{mensaje}</p>
    </div>
  );
};

export default Atrapa;
