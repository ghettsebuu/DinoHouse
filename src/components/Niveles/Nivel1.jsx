// src/components/Niveles/Nivel1.jsx
import React from 'react';
import './nivel.css';

const Nivel1 = ({ mostrarActividad, mostrarMemoryGame, mostrarCartilla }) => {
  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleMostrarCartillaClick = () => {
    mostrarCartilla();
  };

  return (
    <div className='nivel'>
      <img src="/img/level1.jpg" alt="Fondo-nivel1" className='background-image'/>
      <img onClick={handleMostrarActividadClick} src="/img/dinoazul2.png" alt="Rex" className='foreground-image D-Nivel1' />
      <img onClick={handleMostrarMemoryGameClick} src="/img/memoria.png" alt="playjuego" className='foreground-image memoria' />
      <img onClick={handleMostrarCartillaClick} src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
    </div>
  );
};

export default Nivel1;
