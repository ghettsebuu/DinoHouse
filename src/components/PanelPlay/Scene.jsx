import React, { useState } from 'react';
import './PanelPlay.css';
import Nivel1 from '../Niveles/Nivel1.jsx';
import ActividadLv1 from '../Activity/ActividadLv1/ActividadLv1.jsx';
import MemoryGame from '../Activity/ActividadLv1/MemoryGame.jsx';

const SceneComponent = () => {
  const [mostrarActividad, setMostrarActividad] = useState(false);
  const [mostrarMemoryGame, setMostrarMemoryGame] = useState(false);

  const handleMostrarActividad = () => {
    setMostrarActividad(true);
  };

  const handleMostrarMemoryGame = () => {
    setMostrarMemoryGame(true);
  };

  const handleVolverALetras = () => {
    setMostrarMemoryGame(false);
  };

  return (
    <div className="scene">
      {!mostrarActividad && !mostrarMemoryGame ? (
        <Nivel1 mostrarActividad={handleMostrarActividad} mostrarMemoryGame={handleMostrarMemoryGame} />
      ) : mostrarActividad ? (
        <ActividadLv1 mostrarActividad={setMostrarActividad} />
      ) : (
        <MemoryGame onNext={handleVolverALetras} />
      )}
    </div>
  );
};

export default SceneComponent;
