// Nivel1.js
import React from 'react';
import './nivel.css';

const Nivel3 = ({ mostrarActividad, mostrarMemoryGame, seleccionarNivel }) => {
  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleNivelSeleccionado = (nivel) => {
    seleccionarNivel(nivel);
  };
  return (
    <div className='nivel'>  
      <img src="/img/level3.jpg" alt="Fondo-nivel3"  className='background-image'/>
      <img src="/img/dinoverde.png" alt="Tito" className='foreground-image D-Nivel3' />
      
     {/*  <img onClick={handleMostrarActividadClick} src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
      <img onClick={handleMostrarMemoryGameClick} src="/img/memoria.png" alt="playjuego" className='foreground-image memoria' /> */}
 
    </div>
  );
};

export default Nivel3;
