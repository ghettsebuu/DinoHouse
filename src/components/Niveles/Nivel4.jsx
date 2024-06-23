// Nivel1.js
import React from 'react';
import './nivel.css';

const Nivel4 = ({ mostrarActividad, mostrarMemoryGame,mostrarInferencias,mostrarHistorias, seleccionarNivel }) => {
  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleMostrarhistoriasClick = () => {
    mostrarHistorias();
  };
  const handleMostrarInferenciasClick = () => {
    mostrarInferencias();
  };
  

  const handleNivelSeleccionado = (nivel) => {
    seleccionarNivel(nivel);
  };
  return (
    <div className='nivel'>  
      <img src="/img/level4.jpg" alt="Fondo-nivel4"  className='background-image'/>
      <img onClick={handleMostrarActividadClick}  src="/img/dinoAli.png" alt="Ali" className='foreground-image D-Nivel4' />
      <img onClick={handleMostrarhistoriasClick}src="/img/historias.png" alt="playjuego" className='foreground-image historias' />
      <img onClick={handleMostrarInferenciasClick } src="/img/cometa.png" alt="playjuego" className='foreground-image cometa' /> 
    
   </div>
  );
};

export default Nivel4;
