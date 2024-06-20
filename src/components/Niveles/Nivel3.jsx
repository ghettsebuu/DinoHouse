// Nivel1.js
import React from 'react';
import './nivel.css';

const Nivel3 = ({ mostrarActividad, mostrarMemoryGame, mostrarOraciones, seleccionarNivel }) => {
  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleMostrarOracionesClick = () => {
    mostrarOraciones();
  };

  const handleNivelSeleccionado = (nivel) => {
    seleccionarNivel(nivel);
  };

  return (
    <div className='nivel'>
      <img src="/img/level3.jpg" alt="Fondo-nivel3" className='background-image' />
      <img onClick={handleMostrarOracionesClick} src="/img/dinoverde.png" alt="Tito" className='foreground-image D-Nivel3' />
      <img onClick={handleMostrarActividadClick} src="/img/sopa2.png" alt="playjuego" className='foreground-image recetas' />
      {/* <img onClick={handleMostrarMemoryGameClick} src="/img/sandia.png" alt="playjuego" className='foreground-image sandia' /> */}
    </div>
  );
};

export default Nivel3;
