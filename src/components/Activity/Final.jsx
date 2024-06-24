import React from 'react';

const FinalScreen = ({ score, onRestart, onGoToHome, onNext }) => {
    return (
        <div className="final-screen">
            <h2>¡Felicidades! Has completado la actividad.</h2>
            <p>Puntuación: {score} puntos</p>  {/* Mostrar puntuación */}
            <button onClick={onRestart} aria-label="Reiniciar">
                <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <button onClick={onGoToHome} aria-label="Ir al inicio">
                <i className="fa-regular fa-square"></i>
            </button>
            <button onClick={onNext} aria-label="Siguiente actividad">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default FinalScreen;
