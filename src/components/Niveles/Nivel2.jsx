import React from 'react';
import './nivel.css';
import AudioPlayer from '../../helpers/AudioPlayer';
import ProgressBar from './ProgressBar'; // Ajustar la importación según la estructura de carpetas

const Nivel2 = ({ mostrarActividad, mostrarMemoryGame, mostrarLaboratorio, mostrarPalabras, codigoAcceso }) => {
    const handleMostrarActividadClick = () => {
        mostrarActividad();
    };

    const handleMostrarMemoryGameClick = () => {
        mostrarMemoryGame();
    };

    const handleMostrarLaboratorioClick = () => {
        mostrarLaboratorio();
    };

    const handleMostrarPalabrasClick = () => {
        mostrarPalabras();
    };

    return (
        <div className='nivel'>
            <AudioPlayer audioKey="Nivel2" />
            <ProgressBar codigoAcceso={codigoAcceso} level={2} />
            <img src="/img/level2.jpg" alt="Fondo-nivel2" className='background-image'/>
            <img src="/img/dinonaranja1.png" alt="Dina" className='foreground-image D-Nivel2' onClick={handleMostrarActividadClick} />
            <img src="/img/laboratorio.png" alt="laboratorio de silabas" className='foreground-image laboratorio' onClick={handleMostrarLaboratorioClick}/>
            <img src="/img/actividad2.png" alt="Palabras" className='foreground-image cohete' onClick={handleMostrarPalabrasClick} />
        </div>
    );
};

export default Nivel2;
