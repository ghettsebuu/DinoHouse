// src/components/Niveles/Nivel1.jsx
import React, { useState, useEffect } from 'react';
import './nivel.css';
import AudioPlayer from '../../helpers/AudioPlayer';
import ProgressBar from './ProgressBar'; // Ajustar la importación según la estructura de carpetas
import BotonAvanzarNivel from './BotonAvanzarNivel';

const Nivel1 = ({ mostrarActividad, mostrarMemoryGame, mostrarCartilla, codigoAcceso,onLevelUp }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      const images = [
        '/img/level1.jpg',
        '/img/dinoazul2.png',
        '/img/memoria.png',
        '/img/dados.png'
      ];

      const imagePromises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);

      setIsLoading(false);
    };

    loadResources();
  }, []);

  const handleMostrarActividadClick = () => {
    mostrarActividad();
  };

  const handleMostrarMemoryGameClick = () => {
    mostrarMemoryGame();
  };

  const handleMostrarCartillaClick = () => {
    mostrarCartilla();
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='nivel'>
      <AudioPlayer audioKey="Nivel1" />
      <ProgressBar codigoAcceso={codigoAcceso} level={1} />
      <BotonAvanzarNivel codigoAcceso={codigoAcceso} level={1} onLevelUp={onLevelUp} />
      <img src="/img/level1.jpg" alt="Fondo-nivel1" className='background-image'/>
      <img onClick={handleMostrarActividadClick} src="/img/dinoazul2.png" alt="Rex" className='foreground-image D-Nivel1' />
      <img onClick={handleMostrarMemoryGameClick} src="/img/memoria.png" alt="playjuego" className='foreground-image memoria' />
      <img onClick={handleMostrarCartillaClick} src="/img/dados.png" alt="playjuego" className='foreground-image Dado' />
    </div>
  );
};

export default Nivel1;
