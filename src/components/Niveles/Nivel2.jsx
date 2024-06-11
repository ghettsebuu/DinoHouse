// src/components/Niveles/Nivel2.jsx
import React from 'react';
import './nivel.css';

const Nivel2 = ({ mostrarActividad, mostrarMemoryGame, mostrarLaboratorio }) => {
  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleMostrarLaboratorioClick = () => {
    mostrarLaboratorio();
  };

  return (
    <div className='nivel'>
      <img src="/img/level2.jpg" alt="Fondo-nivel2" className='background-image'/>
      <img src="/img/dinonaranja1.png" alt="Dina" className='foreground-image D-Nivel2'  />
      <img src="/img/laboratorio.png" alt="laboratorio de silabas" className='foreground-image laboratorio' onClick={handleMostrarLaboratorioClick}/>
      <img src="/img/actividad2.png" alt="Actividad 2" className='foreground-image cohete' onClick={handleMostrarActividadClick} />

      {/* <img  src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
      <img onClick={handleMostrarMemoryGameClick} src="/img/memoria.png" alt="playjuego" className='foreground-image memoria' /> */}
    </div>
  );
};

export default Nivel2;
