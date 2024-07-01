import React from 'react';
import './nivel.css';
import AudioPlayer from '../../helpers/AudioPlayer';
import ProgressBar from './ProgressBar'; // Ajustar la importación según la estructura de carpetas

const Nivel3 = ({ mostrarActividad, mostrarMemoryGame, mostrarOraciones, mostrarAtrapa, seleccionarNivel, codigoAcceso }) => {
 

  
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

    const handleMostrarAtrapaClick = () => {
        mostrarAtrapa();
    };

    return (
        <div className='nivel'>
            <AudioPlayer audioKey="Nivel3" />
            <ProgressBar codigoAcceso={codigoAcceso} level={3} />
            <img src="/img/level3.jpg" alt="Fondo-nivel3" className='background-image' />
            <img onClick={handleMostrarOracionesClick} src="/img/dinoverde.png" alt="Tito" className='foreground-image D-Nivel3' />
            <img onClick={handleMostrarActividadClick} src="/img/sopa2.png" alt="playjuego" className='foreground-image recetas' />
            <img onClick={handleMostrarAtrapaClick} src="/img/sandia.png" alt="playjuego" className='foreground-image sandia' />
        </div>
    );
};

export default Nivel3;
