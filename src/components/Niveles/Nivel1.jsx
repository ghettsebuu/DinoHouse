import React from 'react';
import './nivel.css';

const Nivel1 = ({ mostrarActividad }) => {
  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  return (
    <div className='nivel'>
      <img src="/img/level1.jpg" alt="Fondo-nivel1"  className='background-image'/>
      <img src="/img/dinoazul2.png" alt="Rex" className='foreground-image D-Nivel1' />
      <img onClick={handleMostrarActividadClick} src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
    </div>
  );
};

export default Nivel1;