import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final';
import './Atrapa.css';
import AudioPlayer from '../../../helpers/AudioPlayer'; 

const frutas = ['Naranja', 'Sandia', 'Banana', 'Manzana', 'Mango', 'Guayaba', 'Fresa', 'Pera'];

const getRandomFruta = () => frutas[Math.floor(Math.random() * frutas.length)];
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');

const Atrapa = () => {
  const [audioKey, setAudioKey] = useState('Fruta'); // Estado para el audio actual
  const [frutaObjetivo, setFrutaObjetivo] = useState(getRandomFruta());
  const [puntos, setPuntos] = useState(0);
  const [mensaje, setMensaje] = useState(''); 
  const [ronda, setRonda] = useState(1);
  const [frutasAleatorias, setFrutasAleatorias] = useState(shuffleArray([...frutas]));
  const [cambios, setCambios] = useState(0);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  const intervalosPorRonda = [10000, 9500, 8000];

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Fruta') {
      const timer = setTimeout(() => {
        setAudioKey('InstruccionFruta');
      }, 3000); // Ajusta el tiempo según la duración del audio de bienvenida
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

  const reiniciarJuego = () => {
    setPuntos(0);
    setRonda(1);
    setCambios(0);
    setShowFinalScreen(false);
    setMensaje('');
    setFrutaObjetivo(getRandomFruta());
    setFrutasAleatorias(shuffleArray([...frutas]));
  };

  if (showFinalScreen) {
    return <FinalScreen score={puntos} onRestart={reiniciarJuego} onGoToHome={() => {}} onNext={() => {}} />;
  }

  return (
    <div className="Atrapa">
      <AudioPlayer audioKey={audioKey} /> 
      <h2>Atrapa la fruta</h2>
      <div className="tablero">
        <p>Ronda: {ronda}/3</p>
        <p><strong>{frutaObjetivo}</strong></p>
        <p>Puntos: {puntos}</p>
      </div>
     
      <div className="frutas">
        {frutasAleatorias.map((fruta, index) => (
          <button key={index} onClick={() => atraparFruta(fruta)}>
            <img src={`/img/Frutas/${fruta}.png`} alt={fruta} className="fruta-img" />
          </button>
        ))}
      </div>
      <p>{mensaje}</p>
    </div>
  );
};

export default Atrapa;
