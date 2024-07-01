// Nivel1.jsx
import React from 'react';
/* import React, { useState, useEffect } from 'react'; */
import './nivel.css';
import AudioPlayer from '../../helpers/AudioPlayer';
import ProgressBar from './ProgressBar'; // Ajustar la importación según la estructura de carpetas
/* import LoadingScreen from '../LoadingScreen/LoadingScreen'; // Importa el componente de pantalla de carga */

const Nivel1 = ({ mostrarActividad, mostrarMemoryGame, mostrarCartilla, codigoAcceso }) => {
 /*  const [loading, setLoading] = useState(true); // Estado para controlar la carga */

/*   useEffect(() => {
    // Simula una carga asincrónica (puedes adaptarlo a tu lógica real)
    const simulateLoading = async () => {
      // Simula una carga de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false); // Cambia el estado de loading una vez completada la carga
    }; 

    simulateLoading();
  }, []); */

  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleMostrarCartillaClick = () => {
    mostrarCartilla();
  };

 /*  if (loading) {
    return <LoadingScreen />; // Muestra la pantalla de carga mientras se carga el nivel
  } */

  return (
    <div className='nivel'>
      <AudioPlayer audioKey="Nivel1" />
      <ProgressBar codigoAcceso={codigoAcceso} level={1} />
      <img src="/img/level1.jpg" alt="Fondo-nivel1" className='background-image'/>
      <img onClick={handleMostrarActividadClick} src="/img/dinoazul2.png" alt="Rex" className='foreground-image D-Nivel1' />
      <img onClick={handleMostrarMemoryGameClick} src="/img/memoria.png" alt="playjuego" className='foreground-image memoria' />
      <img onClick={handleMostrarCartillaClick} src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
    </div>
  );
};

export default Nivel1;
