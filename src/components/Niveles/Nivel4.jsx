// Nivel1.js
import React from 'react';
import './nivel.css';

const Nivel4 = ({ mostrarActividad, mostrarMemoryGame, seleccionarNivel }) => {
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
      <img src="/img/level4.jpg" alt="Fondo-nivel4"  className='background-image'/>
      <img src="/img/dinoAli.png" alt="Ali" className='foreground-image D-Nivel4' />
      <img onClick={handleMostrarActividadClick} src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
      <img onClick={handleMostrarMemoryGameClick} src="/img/memoria.png" alt="playjuego" className='foreground-image memoria' />
    {/*   <button onClick={() => handleNivelSeleccionado(1)}>Nivel 1</button>
      <button onClick={() => handleNivelSeleccionado(2)}>Nivel 2</button>
      <button onClick={() => handleNivelSeleccionado(3)}>Nivel 3</button>
      <button onClick={() => handleNivelSeleccionado(4)}>Nivel 4</button> */}
      
   </div>
  );
};

export default Nivel4;
