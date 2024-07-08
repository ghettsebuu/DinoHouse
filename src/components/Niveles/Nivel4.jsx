// src/components/PanelPlay/Nivel4.jsx
import React from 'react';
import './nivel.css';
import AudioPlayer from '../../helpers/AudioPlayer';
import ProgressBar from './ProgressBar'; // Ajustar la importación según la estructura de carpetas

const Nivel4 = ({ mostrarActividad, mostrarMemoryGame, mostrarInferencias, mostrarHistorias, mostrarSelectNivel, codigoAcceso }) => {
    const handleMostrarActividadClick = () => {
        mostrarActividad();
    };

    const handleMostrarMemoryGameClick = () => {
        mostrarMemoryGame();
    };

    const handleMostrarHistoriasClick = () => {
        mostrarHistorias();
    };

    const handleMostrarInferenciasClick = () => {
        mostrarInferencias();
    };

    const handleMostrarSelectNivel = () => {
        mostrarSelectNivel();
    };

    return (
        <div className='nivel'>
            <AudioPlayer audioKey="Nivel4" />
            <ProgressBar codigoAcceso={codigoAcceso} level={4} />
            <button className='NivelesB' onClick={handleMostrarSelectNivel}>
                <i className="fa-solid fa-reply-all"></i>
            </button>
            <img src="/img/level4.jpg" alt="Fondo-nivel4" className='background-image' />
            <img onClick={handleMostrarActividadClick} src="/img/dinoAli.png" alt="Ali" className='foreground-image D-Nivel4' />
            <img onClick={handleMostrarHistoriasClick} src="/img/historias.png" alt="playjuego" className='foreground-image historias' />
            <img onClick={handleMostrarInferenciasClick} src="/img/cometa.png" alt="playjuego" className='foreground-image cometa' />
        </div>
    );
};

export default Nivel4;
