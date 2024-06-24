import React, { useState, useEffect } from 'react';
import FinalScreen from '../Final';
import './Atrapa.css';

const frutas = ['Naranja', 'Sandia', 'Banana', 'Manzana', 'Mango', 'Guayaba', 'Fresa', 'Pera'];

const getRandomFruta = () => frutas[Math.floor(Math.random() * frutas.length)];
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Atrapa = () => {
  const [frutaObjetivo, setFrutaObjetivo] = useState(getRandomFruta());
  const [puntos, setPuntos] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [ronda, setRonda] = useState(1);
  const [frutasAleatorias, setFrutasAleatorias] = useState(shuffleArray([...frutas]));
  const [cambios, setCambios] = useState(0);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  const intervalosPorRonda = [10000, 8000, 6000];

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
        setShowFinalScreen(true);
      }
    }
  }, [cambios, ronda]);

  const atraparFruta = (fruta) => {
    if (fruta === frutaObjetivo) {
      setPuntos(puntos + 10);
      setMensaje('¡Correcto!');
    } else {
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
